import * as crypto from 'crypto';
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { OTP_LENGTH, OTP_REVOKE_SECONDS, TokenType } from './auth.constants';
import { RequestOTPDto } from './dto/request-otp.dto';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
		private readonly authConfig: AuthConfig,
	) {}

	generateOTP(): string {
		const lengthArray = Array.from({ length: OTP_LENGTH });
		const randomDigits = lengthArray.map(() => crypto.randomInt(0, 10));
		return randomDigits.join('');
	}

	async requestOTP(requestOTPDto: RequestOTPDto): Promise<void> {
		const otp = this.generateOTP();
		await this.prisma.otp.create({
			data: {
				user: {
					connectOrCreate: {
						create: {
							tel: requestOTPDto.tel,
						},
						where: {
							tel: requestOTPDto.tel,
						},
					},
				},
				otp: otp,
				revokeDate: new Date(new Date().getTime() + OTP_REVOKE_SECONDS * 1000),
			},
		});
		//TODO: replace with otp sending logic
		console.log(otp);
	}

	async isValidOTPDto(verifyOTPDto: VerifyOTPDto): Promise<boolean> {
		const databaseOTP = await this.prisma.otp.findFirst({
			where: {
				user: {
					tel: verifyOTPDto.tel,
				},
				otp: verifyOTPDto.otp,
				revokeDate: {
					gte: new Date(),
				},
			},
		});
		if (!databaseOTP) {
			return false;
		}
		return true;
	}

	async revokeOTP(verifyOTPDto: VerifyOTPDto): Promise<void> {
		await this.prisma.otp.updateMany({
			where: {
				user: {
					tel: verifyOTPDto.tel,
				},
				otp: verifyOTPDto.otp,
				revokeDate: {
					gte: new Date(),
				},
			},
			data: {
				revokeDate: new Date(),
			},
		});
	}

	/**
	 * returns `AuthTokenDto` if provided VerifyOTPDto is valid else `null`
	 */
	async verifyOTP(verifyOTPDto: VerifyOTPDto): Promise<AuthTokenDto | null> {
		if (!(await this.isValidOTPDto(verifyOTPDto))) return null;
		await this.revokeOTP(verifyOTPDto);

		const user = await this.usersService.findOrCreateUser(verifyOTPDto.tel);

		return await this.createAuthToken(user);
	}

	async revokeRefreshToken(uuid: string): Promise<void> {
		await this.prisma.refreshToken.update({
			where: {
				uuid: uuid,
			},
			data: {
				isRevoked: true,
			},
		});
	}

	async revokeTokenNextRelations(uuid: string): Promise<void> {
		const databaseRefreshToken = await this.prisma.refreshToken.findUnique({
			where: {
				uuid: uuid,
			},
		});
		if (!databaseRefreshToken) {
			return;
		}
		await this.revokeRefreshToken(uuid);
		if (databaseRefreshToken.nextId) {
			await this.revokeTokenNextRelations(databaseRefreshToken.nextId);
		}
	}

	async refresh(refreshToken: string): Promise<AuthTokenDto> {
		const payload = await this.verifyToken(refreshToken);

		if (payload.type != TokenType.refresh) {
			throw new BadRequestException(
				'Incorrect type of token. It should be "refresh"',
			);
		}

		const databaseRefreshToken = await this.prisma.refreshToken.findUnique({
			where: {
				uuid: payload.jti,
			},
		});

		if (!databaseRefreshToken) {
			throw new NotFoundException(
				'Refresh token with this jti not found in database',
			);
		}

		if (databaseRefreshToken.isRevoked) {
			await this.revokeTokenNextRelations(databaseRefreshToken.uuid);

			throw new ForbiddenException(
				"Предоставленный Refresh Token был использован ранее. Все связанные refresh token'ы будут отозваны",
			);
		}

		await this.revokeRefreshToken(payload.jti);

		const user = await this.prisma.user.findUnique({
			where: {
				id: +payload.sub,
			},
		});
		if (!user) {
			throw new NotFoundException(`User with id ${+payload.sub} not found`);
		}

		const newAuthToken = await this.createAuthToken(user);
		const newRefreshTokenPayload = await this.verifyToken(
			newAuthToken.refreshToken,
		);
		await this.prisma.refreshToken.update({
			where: {
				uuid: payload.jti,
			},
			data: {
				next: {
					connect: {
						uuid: newRefreshTokenPayload.jti,
					},
				},
			},
		});

		return newAuthToken;
	}

	/**
	 * returns token payload
	 * throws `UnauthorizedException` if payload is invalid
	 */
	async verifyToken<T extends object = any>(token: string): Promise<T> {
		try {
			const payload = await this.jwtService.verifyAsync(token);
			return payload;
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}

	async createAuthToken(user: User): Promise<AuthTokenDto> {
		return {
			accessToken: await this.createAccessToken(user),
			refreshToken: await this.createRefreshToken(user),
		};
	}

	async createAccessToken(user: User): Promise<string> {
		const payload = {
			type: TokenType.access,
		};
		return this.jwtService.sign(payload, {
			subject: user.id.toString(),
		});
	}

	async createRefreshToken(user: User): Promise<string> {
		const payload = {
			type: TokenType.refresh,
		};
		const databaseRefreshToken = await this.prisma.refreshToken.create({
			data: {},
		});
		const token = this.jwtService.sign(payload, {
			subject: user.id.toString(),
			jwtid: databaseRefreshToken.uuid,
			expiresIn: this.authConfig.jwtRefreshTokenExpiresIn,
		});
		await this.prisma.refreshToken.update({
			where: {
				uuid: databaseRefreshToken.uuid,
			},
			data: {
				token: token,
			},
		});
		return token;
	}
}
