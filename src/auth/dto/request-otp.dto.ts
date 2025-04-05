import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone } from 'class-validator';

export class RequestOTPDto {
	@ApiProperty({
		example: '+46701234567',
	})
	@IsMobilePhone()
	tel: string;
}
