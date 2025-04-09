import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsIn,
	IsInt,
	IsISO8601,
	IsNotEmpty,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

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

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	bannerUrl?: string;

	@ApiProperty({
		type: UserDto,
	})
	author: UserDto;

	@ApiProperty({
		type: 'integer',
	})
	@Min(0)
	@IsInt()
	views: number;

	@ApiProperty()
	@IsISO8601()
	createdAt: Date;

	@ApiProperty()
	@IsISO8601()
	updatedAt: Date;
}
