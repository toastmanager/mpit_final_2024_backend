import { Module } from '@nestjs/common';
import { VolunteerFeedbacksService } from './volunteer-feedbacks.service';
import { VolunteerFeedbacksController } from './volunteer-feedbacks.controller';

@Module({
  controllers: [VolunteerFeedbacksController],
  providers: [VolunteerFeedbacksService],
})
export class VolunteerFeedbacksModule {}
