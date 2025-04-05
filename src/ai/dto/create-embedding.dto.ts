import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmbeddingDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	text: string;
}
