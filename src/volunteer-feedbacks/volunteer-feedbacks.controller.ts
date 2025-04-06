import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolunteerFeedbacksService } from './volunteer-feedbacks.service';
import { CreateVolunteerFeedbackDto } from './dto/create-volunteer-feedback.dto';
import { UpdateVolunteerFeedbackDto } from './dto/update-volunteer-feedback.dto';

@Controller('volunteer-feedbacks')
export class VolunteerFeedbacksController {
  constructor(private readonly volunteerFeedbacksService: VolunteerFeedbacksService) {}

  @Post()
  create(@Body() createVolunteerFeedbackDto: CreateVolunteerFeedbackDto) {
    return this.volunteerFeedbacksService.create(createVolunteerFeedbackDto);
  }

  @Get()
  findAll() {
    return this.volunteerFeedbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteerFeedbacksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolunteerFeedbackDto: UpdateVolunteerFeedbackDto) {
    return this.volunteerFeedbacksService.update(+id, updateVolunteerFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerFeedbacksService.remove(+id);
  }
}
