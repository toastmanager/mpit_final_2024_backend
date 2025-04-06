import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { HELP_REQUEST_FEEDBACK_MAX_SCORE } from '../help-requests.constants';

export class HelpRequestFeedbackDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	helpRequestUuid: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	text: string;

	@ApiProperty({
		type: 'integer',
		example: 3,
	})
	@IsInt()
	@Min(1)
	@Max(HELP_REQUEST_FEEDBACK_MAX_SCORE)
	score: number;
}
