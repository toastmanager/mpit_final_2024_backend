import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { HELP_REQUEST_FEEDBACK_MAX_SCORE } from '../help-requests.constants';

export class CreateHelpRequestFeedbackDto {
	@ApiProperty()
	@IsString()
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
