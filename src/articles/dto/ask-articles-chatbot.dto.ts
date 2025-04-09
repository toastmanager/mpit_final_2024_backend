import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AskArticlesChatbotDto {
	@ApiProperty()
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	history?: string;
}
