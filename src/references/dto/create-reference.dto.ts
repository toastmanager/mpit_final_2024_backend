import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReferenceType } from '@prisma/client';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReferenceDto {
	@ApiProperty({
		description: 'Array of address strings',
		example: ['123 Main St', '456 Secondary Ave'],
	})
	@IsArray()
	@IsString({ each: true })
	addresses: string[];

	@ApiProperty({
		description: 'Title of the reference',
		example: 'Premium Hotel',
	})
	@IsString()
	title: string;

	@ApiProperty({
		enum: ReferenceType,
	})
	type: ReferenceType;

	@ApiPropertyOptional({
		description: 'Description of the reference',
		example: 'Luxury hotel with sea view',
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional({ description: 'Capacity number', example: 200 })
	@IsOptional()
	@IsInt()
	capacity?: number;
}
