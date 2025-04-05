import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	NotFoundException,
} from '@nestjs/common';
import { HelpRequestsService } from './help-requests.service';
import { CreateHelpRequestDto } from './dto/create-help-request.dto';
import { UpdateHelpRequestDto } from './dto/update-help-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { HelpRequestDto } from './dto/help-request.dto';

@Controller('helpRequests')
export class HelpRequestsController {
	constructor(private readonly helpRequestsService: HelpRequestsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: HelpRequestDto,
	})
	async create(@Body() createHelpRequestDto: CreateHelpRequestDto) {
		const helpRequest = await this.helpRequestsService.create({
			data: createHelpRequestDto,
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
		const helpRequests = await this.helpRequestsService.findMany();
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
}
