import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsString,
	IsArray,
	ValidateNested,
	IsDefined,
	IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AdditionalKwargsDto } from './additional-kwargs.dto'; // Adjust path
import { ResponseMetadataDto } from './response-metadata.dto'; // Adjust path
import { UsageMetadataDto } from './usage-metadata.dto'; // Adjust path

// Define ToolCallDto/InvalidToolCallDto if structure is known, otherwise use 'any'
// export class ToolCallDto { /* properties */ }
// export class InvalidToolCallDto { /* properties */ }

export class KwargsDto {
	@ApiProperty({
		description: 'The main text content of the message.',
		example: 'Привет! Меня радует, что ты меня приветствуешь...',
	})
	@IsString()
	content: string;

	@ApiPropertyOptional({
		description: 'Additional arguments, often including tool calls.',
		type: AdditionalKwargsDto,
	})
	@IsOptional() // Made optional as it might not always be present
	@ValidateNested()
	@Type(() => AdditionalKwargsDto)
	additional_kwargs?: AdditionalKwargsDto;

	@ApiProperty({
		description: 'Metadata associated with the response generation.',
		type: ResponseMetadataDto,
	})
	@ValidateNested()
	@Type(() => ResponseMetadataDto)
	@IsDefined()
	response_metadata: ResponseMetadataDto;

	@ApiPropertyOptional({
		description: 'A unique identifier for the message or interaction.',
		example: 'nojKFuH-4Yz4kd-92b01c957d6af136',
	})
	@IsOptional() // ID might be assigned later or not always present
	@IsString()
	id?: string;

	@ApiPropertyOptional({
		description: 'List of valid tool calls made.',
		example: [],
		type: 'array',
		items: { type: 'object' }, // Specify items are objects
	})
	@IsOptional() // Often empty or not present
	@IsArray()
	// If you have a specific DTO:
	// @ValidateNested({ each: true })
	// @Type(() => ToolCallDto)
	tool_calls?: any[];

	@ApiPropertyOptional({
		description: 'List of invalid tool calls attempted.',
		example: [],
		type: 'array',
		items: { type: 'object' }, // Specify items are objects
	})
	@IsOptional() // Often empty or not present
	@IsArray()
	// If you have a specific DTO:
	// @ValidateNested({ each: true })
	// @Type(() => InvalidToolCallDto)
	invalid_tool_calls?: any[];

	@ApiProperty({
		description: 'Detailed usage metadata including token counts and details.',
		type: UsageMetadataDto,
	})
	@ValidateNested()
	@Type(() => UsageMetadataDto)
	@IsDefined()
	usage_metadata: UsageMetadataDto;
}
