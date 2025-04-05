import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
import { HelpRequestStatus } from '@prisma/client';

export class CreateHelpRequestDto {
	@ApiProperty({
		description: 'Help request text content',
		example: 'I need help with my homework in mathematics',
	})
	@IsString()
	text: string;

	@ApiProperty({
		description: 'ID of the user who creates the request',
		example: 1,
	})
	@IsInt()
	requesterId: number;

	@ApiProperty({
		description: 'Initial status of the help request',
		enum: HelpRequestStatus,
		default: HelpRequestStatus.ON_CONSIDERATION,
	})
	status?: HelpRequestStatus;
}
