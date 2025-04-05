import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class TokenUsageDto {
	@ApiProperty({
		description: 'Number of tokens in the prompt.',
		example: 50,
	})
	@IsInt()
	@Min(0)
	promptTokens: number;

	@ApiProperty({
		description: 'Number of tokens in the completion.',
		example: 136,
	})
	@IsInt()
	@Min(0)
	completionTokens: number;

	@ApiProperty({
		description: 'Total number of tokens used.',
		example: 186,
	})
	@IsInt()
	@Min(0)
	totalTokens: number;
}
