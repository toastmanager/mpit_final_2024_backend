import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from './auth.config';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		PassportModule,
		UsersModule,
		JwtModule.registerAsync({
			inject: [AuthConfig],
			useFactory: async (authConfig: AuthConfig) => ({
				secret: authConfig.jwtSecret,
				signOptions: {
					expiresIn: authConfig.jwtAccessTokenExpiresIn,
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
