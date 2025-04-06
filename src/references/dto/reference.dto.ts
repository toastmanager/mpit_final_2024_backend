import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReferenceType } from '@prisma/client';

export class ReferenceDto {
	@ApiProperty({
		description: 'Unique identifier of the reference',
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: 'Array of address strings',
		example: ['123 Main St', '456 Secondary Ave'],
	})
	addresses: string[];

	@ApiProperty({
		description: 'Title of the reference',
		example: 'Premium Customer',
	})
	title: string;

	@ApiProperty({
		enum: ReferenceType,
	})
	type: ReferenceType;

	@ApiPropertyOptional({
		description: 'Description of the reference',
		example: 'This customer has been with us for 5 years',
	})
	description?: string;

	@ApiPropertyOptional({
		description: 'Capacity number for the reference',
		example: 100,
	})
	capacity?: number;
}
