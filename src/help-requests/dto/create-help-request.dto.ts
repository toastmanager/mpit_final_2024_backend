import { ApiProperty } from '@nestjs/swagger';
import { HelpRequestType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHelpRequestDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	text: string;

	@ApiProperty({
		description: 'Help request text content',
		example: 'I need help with something',
	})
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({
		description: 'Initial type of the help request',
		enum: HelpRequestType,
	})
	type: HelpRequestType;
}
