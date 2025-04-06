import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Request,
	UseGuards,
	NotFoundException,
	Put,
} from '@nestjs/common';
import { HelpRequestsService } from './help-requests.service';
import { CreateHelpRequestDto } from './dto/create-help-request.dto';
import { UpdateHelpRequestDto } from './dto/update-help-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { HelpRequestDto } from './dto/help-request.dto';
import { HelpRequestStatus } from '@prisma/client';
import { HelpRequestFeedbackDto } from './dto/help-request-feedback.dto';
import { CreateHelpRequestFeedbackDto } from './dto/create-help-request-feedback.dto';
import { UpdateHelpRequetStatusDto } from './dto/update-help-request-status.dto';

@Controller('help-requests')
export class HelpRequestsController {
	constructor(private readonly helpRequestsService: HelpRequestsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestDto,
	})
	async create(
		@Request() req: any,
		@Body() createHelpRequestDto: CreateHelpRequestDto,
	) {
		const { user } = req;
		const helpRequest = await this.helpRequestsService.create({
			data: {
				...createHelpRequestDto,
				requester: {
					connect: {
						id: +user.sub,
					},
				},
			},
		});
		const helpRequestDto =
			await this.helpRequestsService.getHelpRequestDto(helpRequest);
		return helpRequestDto;
	}

	@Get()
	@ApiOkResponse({
		type: HelpRequestDto,
		isArray: true,
	})
	async findAll() {
		const helpRequests = await this.helpRequestsService.findMany({
			where: {
				status: HelpRequestStatus.APPROVED,
			},
		});
		const helpRequestDto =
			await this.helpRequestsService.getHelpRequestDtos(helpRequests);
		return helpRequestDto;
	}

	@Get(':uuid')
	@ApiOkResponse({
		type: HelpRequestDto,
	})
	async findOne(@Param('uuid') uuid: string) {
		const helpRequest = await this.helpRequestsService.findUnique({
			where: {
				uuid: uuid,
			},
		});
		if (!helpRequest) {
			throw new NotFoundException();
		}
		const helpRequestDto =
			await this.helpRequestsService.getHelpRequestDto(helpRequest);
		return helpRequestDto;
	}

	@Patch(':uuid')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestDto,
	})
	async update(
		@Param('uuid') uuid: string,
		@Body() updateHelpRequestDto: UpdateHelpRequestDto,
	) {
		const helpRequest = await this.helpRequestsService.update({
			where: {
				uuid: uuid,
			},
			data: updateHelpRequestDto,
		});
		const helpRequestDto =
			await this.helpRequestsService.getHelpRequestDto(helpRequest);
		return helpRequestDto;
	}

	@Delete(':uuid')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestDto,
	})
	async remove(@Param('uuid') uuid: string) {
		const helpRequest = await this.helpRequestsService.remove({
			where: {
				uuid: uuid,
			},
		});
		const helpRequestDto =
			await this.helpRequestsService.getHelpRequestDto(helpRequest);
		return helpRequestDto;
	}

	@Post(':uuid/volunteer')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestDto,
	})
	async respond(@Request() req: any, @Param('uuid') uuid: string) {
		const { user } = req;
		const helpRequest = await this.helpRequestsService.setVolunteer({
			requestUuid: uuid,
			volunteerId: +user.sub,
		});
		return helpRequest;
	}

	@Delete(':uuid/volunteer')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestDto,
	})
	async decline(@Request() req: any, @Param('uuid') uuid: string) {
		const helpRequest = await this.helpRequestsService.removeVolunteer(uuid);
		return helpRequest;
	}

	@Post(':uuid/feedback')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestFeedbackDto,
	})
	async addFeedback(
		@Param('uuid') uuid: string,
		@Body() createHelpRequestFeedbackDto: CreateHelpRequestFeedbackDto,
	): Promise<HelpRequestFeedbackDto> {
		const feedback = await this.helpRequestsService.createFeedback({
			data: {
				...createHelpRequestFeedbackDto,
				helpRequest: {
					connect: {
						uuid: uuid,
					},
				},
			},
		});
		const feedbackDto = await this.helpRequestsService.getFeedbackDto(feedback);
		return feedbackDto;
	}

	@Delete(':uuid/feedback')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestFeedbackDto,
	})
	async removeFeedback(
		@Param('uuid') uuid: string,
	): Promise<HelpRequestFeedbackDto> {
		const feedback = await this.helpRequestsService.removeFeedback(uuid);
		const feedbackDto = await this.helpRequestsService.getFeedbackDto(feedback);
		return feedbackDto;
	}

	@Put(':uuid/status')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestFeedbackDto,
	})
	async updateHelpRequetStatus(
		@Param('uuid') uuid: string,
		@Body() updateHelpRequetStatusDto: UpdateHelpRequetStatusDto,
	): Promise<HelpRequestDto> {
		const helpRequest = await this.helpRequestsService.update({
			where: {
				uuid: uuid,
			},
			data: {
				status: updateHelpRequetStatusDto.status,
			},
		});
		const helpRequestDto =
			await this.helpRequestsService.getHelpRequestDto(helpRequest);
		//TODO: Send notification about status change
		return helpRequestDto;
	}
}
