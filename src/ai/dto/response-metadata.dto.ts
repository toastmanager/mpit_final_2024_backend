import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { TokenUsageDto } from './token-usage.dto'; // Adjust path as needed

export class ResponseMetadataDto {
	@ApiProperty({
		description: 'Token usage statistics for the response.',
		type: TokenUsageDto,
	})
	@ValidateNested()
	@Type(() => TokenUsageDto)
	@IsDefined() // Ensure the object itself exists, even if empty
	tokenUsage: TokenUsageDto;

	@ApiProperty({
		description: 'Reason why the model stopped generating text.',
		example: 'stop',
	})
	@IsString()
	finish_reason: string;

	@ApiProperty({
		description: 'Identifier for the model used.',
		example: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
	})
	@IsString()
	model_name: string;
}
