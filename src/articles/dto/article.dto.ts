import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class ArticleDto {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	slug: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	text: string;

	@ApiProperty({
		type: UserResponseDto,
	})
	author: UserResponseDto;

	@ApiProperty()
	@IsISO8601()
	createdAt: Date;

	@ApiProperty()
	@IsISO8601()
	updatedAt: Date;
}
