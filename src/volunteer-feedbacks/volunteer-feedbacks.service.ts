import { Injectable } from '@nestjs/common';
import { CreateVolunteerFeedbackDto } from './dto/create-volunteer-feedback.dto';
import { UpdateVolunteerFeedbackDto } from './dto/update-volunteer-feedback.dto';

@Injectable()
export class VolunteerFeedbacksService {
  create(createVolunteerFeedbackDto: CreateVolunteerFeedbackDto) {
    return 'This action adds a new volunteerFeedback';
  }

  findAll() {
    return `This action returns all volunteerFeedbacks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} volunteerFeedback`;
  }

  update(id: number, updateVolunteerFeedbackDto: UpdateVolunteerFeedbackDto) {
    return `This action updates a #${id} volunteerFeedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} volunteerFeedback`;
  }
}
