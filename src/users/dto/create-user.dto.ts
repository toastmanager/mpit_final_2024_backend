import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		description: 'The telephone number of the user',
		example: '+46701234567',
	})
	@IsString()
	tel: string;
}
