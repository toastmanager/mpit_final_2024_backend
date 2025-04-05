import { ApiProperty } from '@nestjs/swagger';
import {
	IsInt,
	IsString,
	IsArray,
	ArrayNotEmpty,
	ValidateNested,
	IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { KwargsDto } from './kwargs.dto'; // Adjust path as needed

export class AiResponseDto {
	@ApiProperty({
		description: 'Schema version or lifecycle identifier.',
		example: 1,
	})
	@IsInt()
	lc: number;

	@ApiProperty({
		description: 'Type identifier for the object structure.',
		example: 'constructor',
	})
	@IsString()
	type: string;

	@ApiProperty({
		description: 'Hierarchical identifier components.',
		example: ['langchain_core', 'messages', 'AIMessage'],
		type: [String],
	})
	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	id: string[];

	@ApiProperty({
		description: 'Core arguments and data payload.',
		type: KwargsDto,
	})
	@ValidateNested()
	@Type(() => KwargsDto)
	@IsDefined()
	kwargs: KwargsDto;
}
