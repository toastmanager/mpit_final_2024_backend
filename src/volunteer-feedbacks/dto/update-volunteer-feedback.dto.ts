import { PartialType } from '@nestjs/swagger';
import { CreateVolunteerFeedbackDto } from './create-volunteer-feedback.dto';

export class UpdateVolunteerFeedbackDto extends PartialType(CreateVolunteerFeedbackDto) {}
