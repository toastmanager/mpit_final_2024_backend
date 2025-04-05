import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

// Define a basic ToolCallDto if needed, otherwise use 'any'
// export class ToolCallDto { /* properties */ }

export class AdditionalKwargsDto {
	@ApiProperty({
		description: 'List of tool calls requested by the model.',
		example: [],
		type: 'array',
		items: { type: 'object' }, // Specify items are objects, adjust if ToolCallDto is defined
		required: false, // Marking as optional based on common usage
	})
	@IsArray()
	@IsOptional()
	// If you have a specific DTO for tool calls:
	// @ValidateNested({ each: true })
	// @Type(() => ToolCallDto)
	tool_calls?: any[]; // Use 'any[]' if structure is unknown or varies
}
