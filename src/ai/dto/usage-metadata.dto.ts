import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, Min } from 'class-validator';

export class UsageMetadataDto {
	@ApiProperty({
		description: 'Number of tokens in the output.',
		example: 136,
	})
	@IsInt()
	@Min(0)
	output_tokens: number;

	@ApiProperty({
		description: 'Number of tokens in the input.',
		example: 50,
	})
	@IsInt()
	@Min(0)
	input_tokens: number;

	@ApiProperty({
		description: 'Total number of tokens used.',
		example: 186,
	})
	@IsInt()
	@Min(0)
	total_tokens: number;

	@ApiProperty({
		description:
			'Detailed information about input tokens (structure may vary).',
		example: {},
	})
	@IsObject()
	input_token_details: Record<string, any>;

	@ApiProperty({
		description:
			'Detailed information about output tokens (structure may vary).',
		example: {},
	})
	@IsObject()
	output_token_details: Record<string, any>;
}
