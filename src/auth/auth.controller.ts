import {
	Body,
	Request,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
	Get,
	UseGuards,
	NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
	ApiBearerAuth,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthTokenDto } from './dto/auth-token.dto';
import { RequestOTPDto } from './dto/request-otp.dto';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { UserSensitiveResponseDto } from '../users/dto/user-sensitive.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Post('otp/request')
	@ApiNoContentResponse({
		description: 'Successfull request of OTP for provided credentials',
	})
	@HttpCode(204)
	async requestOTP(@Body() requestOTPDto: RequestOTPDto): Promise<void> {
		await this.authService.requestOTP(requestOTPDto);
		return;
	}

	@Post('otp/verify')
	@ApiOkResponse({
		type: AuthTokenDto,
	})
	@ApiNotFoundResponse({
		description: 'No OTP for provided credentials',
	})
	@ApiUnauthorizedResponse({
		description: 'Incorrect OTP',
	})
	@HttpCode(200)
	async verifyOTP(@Body() verifyOTPDto: VerifyOTPDto) {
		const authToken = await this.authService.verifyOTP(verifyOTPDto);
		if (!authToken) {
			throw new UnauthorizedException('Incorrect OTP');
		}
		return authToken;
	}

	@Post('refresh')
	@ApiOkResponse({
		type: AuthTokenDto,
	})
	@HttpCode(200)
	async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
		const authToken = await this.authService.refresh(
			refreshTokenDto.refreshToken,
		);
		return authToken;
	}

	@Post('logout')
	@ApiNoContentResponse()
	@HttpCode(204)
	logout(@Body() logoutDto: LogoutDto) {
		const { refreshToken } = logoutDto;
		this.authService.revokeRefreshToken(refreshToken);
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({
		type: UserSensitiveResponseDto,
	})
	@ApiBearerAuth()
	async getUser(@Request() req: any): Promise<UserSensitiveResponseDto> {
		const { user: payload } = req;
		const user = await this.usersService.findUnique({
			where: {
				id: +payload.sub,
			},
		});
		if (!user) {
			throw new NotFoundException('User with this id not found');
		}
		return user;
	}
}
