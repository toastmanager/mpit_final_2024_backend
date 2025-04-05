import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';
import { OTP_LENGTH } from '../auth.constants';

export class VerifyOTPDto {
	@ApiProperty({
		example: '+46701234567',
	})
	@IsMobilePhone()
	tel: string;

	@ApiProperty({
		example: Array.from({ length: OTP_LENGTH })
			.map((_) => '1')
			.join(''),
	})
	@IsString()
	@IsNotEmpty()
	@Length(OTP_LENGTH, OTP_LENGTH)
	otp: string;
}
