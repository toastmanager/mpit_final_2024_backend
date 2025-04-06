import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContactDto {
	@ApiProperty()
	@IsString()
	contact: string;

	@ApiProperty()
	@IsString()
	type: string;
}
