import { ApiProperty } from '@nestjs/swagger';
import { HelpRequestStatus, HelpRequestType } from '@prisma/client';

export class HelpRequestDto {
	@ApiProperty({
		description: 'Unique identifier of the help request',
		example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
	})
	uuid: string;

	@ApiProperty({
		description: 'Help request text content',
		example: 'I need help with my homework in mathematics',
	})
	text: string;

	@ApiProperty({
		description: 'ID of the requester user',
		example: 1,
	})
	requesterId: number;

	@ApiProperty({
		description: 'ID of the volunteer who accepted the request (if any)',
		example: 2,
		required: false,
	})
	volunteerId?: number;

	@ApiProperty({
		description: 'Current status of the help request',
		enum: HelpRequestType,
	})
	type: HelpRequestType;

	@ApiProperty({
		description: 'Current status of the help request',
		enum: HelpRequestStatus,
		example: HelpRequestStatus.ON_CONSIDERATION,
	})
	status: HelpRequestStatus;

	@ApiProperty({
		description: 'When the request was created',
		example: '2023-04-05T10:30:00.000Z',
	})
	createdAt: Date;

	@ApiProperty({
		description: 'When the request was last updated',
		example: '2023-04-05T11:45:00.000Z',
	})
	updatedAt: Date;
}
