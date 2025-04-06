import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
	@ApiProperty({ description: 'Unique identifier', example: 1 })
	id: number;

	@ApiPropertyOptional({
		description: 'Reference ID this contact belongs to',
		example: 1,
	})
	referenceId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	contact: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	type: string;
}
