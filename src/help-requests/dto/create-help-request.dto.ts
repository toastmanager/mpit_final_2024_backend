import { ApiProperty } from '@nestjs/swagger';
import { HelpRequestType } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateHelpRequestDto {
	@ApiProperty({
		description: 'Help request text content',
		example: 'I need help with something',
	})
	@IsString()
	text: string;

	@ApiProperty({
		description: 'Initial type of the help request',
		enum: HelpRequestType,
	})
	type: HelpRequestType;
}
