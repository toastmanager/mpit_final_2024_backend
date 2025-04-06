import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	HelpRequest,
	HelpRequestFeedback,
	HelpRequestStatus,
	Prisma,
} from '@prisma/client';
import { HelpRequestDto } from './dto/help-request.dto';
import { removeNullFields } from '../utils';
import { HelpRequestFeedbackDto } from './dto/help-request-feedback.dto';

@Injectable()
export class HelpRequestsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(args: Prisma.HelpRequestCreateArgs) {
		const helpRequest = await this.prisma.helpRequest.create(args);
		return helpRequest;
	}

	async findMany(args?: Prisma.HelpRequestFindManyArgs) {
		const helpRequests = await this.prisma.helpRequest.findMany(args);
		return helpRequests;
	}

	async findFirst(args?: Prisma.HelpRequestFindFirstArgs) {
		const helpRequest = await this.prisma.helpRequest.findFirst(args);
		return helpRequest;
	}

	async findUnique(args: Prisma.HelpRequestFindUniqueArgs) {
		const helpRequest = await this.prisma.helpRequest.findUnique(args);
		return helpRequest;
	}

	async update(args: Prisma.HelpRequestUpdateArgs) {
		const helpRequest = await this.prisma.helpRequest.update(args);
		return helpRequest;
	}

	async remove(args: Prisma.HelpRequestDeleteArgs) {
		const helpRequest = await this.prisma.helpRequest.delete(args);
		return helpRequest;
	}

	async getHelpRequestDto(helpRequest: HelpRequest): Promise<HelpRequestDto> {
		return removeNullFields(helpRequest);
	}

	async getHelpRequestDtos(
		helpRequests: HelpRequest[],
	): Promise<HelpRequestDto[]> {
		const helpRequestsDtos: HelpRequestDto[] = [];
		for (const helpRequest of helpRequests) {
			const helpRequestDto = await this.getHelpRequestDto(helpRequest);
			if (helpRequestDto) helpRequestsDtos.push(helpRequestDto);
		}
		return helpRequestsDtos;
	}

	async setVolunteer(args: { requestUuid: string; volunteerId: number }) {
		const { requestUuid, volunteerId } = args;
		const request = await this.prisma.helpRequest.update({
			where: {
				uuid: requestUuid,
			},
			data: {
				volunteer: {
					connect: {
						id: volunteerId,
					},
				},
				status: HelpRequestStatus.VOLUNTEER_FOUND,
			},
		});
		return request;
	}

	async removeVolunteer(requestUuid: string) {
		const request = await this.prisma.helpRequest.update({
			where: {
				uuid: requestUuid,
			},
			data: {
				volunteer: {
					disconnect: true,
				},
				status: HelpRequestStatus.APPROVED,
			},
		});
		return request;
	}

	async createFeedback(args: Prisma.HelpRequestFeedbackCreateArgs) {
		const feedback = await this.prisma.helpRequestFeedback.create(args);
		return feedback;
	}

	async removeFeedback(helpRequestUuid: string) {
		const feedback = await this.prisma.helpRequestFeedback.delete({
			where: {
				helpRequestUuid: helpRequestUuid,
			},
		});
		return feedback;
	}

	async getFeedbackDto(
		feedback: HelpRequestFeedback,
	): Promise<HelpRequestFeedbackDto> {
		return removeNullFields(feedback);
	}
}
