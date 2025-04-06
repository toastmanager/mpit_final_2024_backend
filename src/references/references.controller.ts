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
} from '@nestjs/common';
import { ReferencesService } from './references.service';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { ReferenceDto } from './dto/reference.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactDto } from './dto/contact.dto';

@Controller('references')
export class ReferencesController {
	constructor(private readonly referencesService: ReferencesService) {}

	@Delete('contacts/:contact_id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: ContactDto,
	})
	async removeContact(
		@Request() req: any,
		@Param('contact_id') contactId: string,
	): Promise<ContactDto> {
		const { user: _ } = req;
		const contact = await this.referencesService.removeContact(+contactId);
		const contactDto = await this.referencesService.getContactDto(contact);
		return contactDto;
	}

	@Post()
	@ApiOkResponse({
		type: ReferenceDto,
	})
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async create(
		@Body() createReferenceDto: CreateReferenceDto,
	): Promise<ReferenceDto> {
		const reference = await this.referencesService.create({
			data: createReferenceDto,
		});
		const referenceDto =
			await this.referencesService.getReferenceDto(reference);
		return referenceDto;
	}

	@Get()
	@ApiOkResponse({
		type: ReferenceDto,
		isArray: true,
	})
	async findAll(): Promise<ReferenceDto[]> {
		const references = await this.referencesService.findMany();
		const referencesDtos =
			await this.referencesService.getReferenceDtos(references);
		return referencesDtos;
	}

	@Get(':id')
	@ApiOkResponse({
		type: ReferenceDto,
	})
	async findOne(@Param('id') id: string): Promise<ReferenceDto> {
		const reference = await this.referencesService.findUnique({
			where: {
				id: +id,
			},
		});
		if (!reference) {
			throw new NotFoundException();
		}
		const referenceDto =
			await this.referencesService.getReferenceDto(reference);
		return referenceDto;
	}

	@Patch(':id')
	@ApiOkResponse({
		type: ReferenceDto,
	})
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async update(
		@Param('id') id: string,
		@Body() updateReferenceDto: UpdateReferenceDto,
	): Promise<ReferenceDto> {
		const reference = await this.referencesService.update({
			where: {
				id: +id,
			},
			data: updateReferenceDto,
		});
		const referenceDto =
			await this.referencesService.getReferenceDto(reference);
		return referenceDto;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async remove(@Param('id') id: string): Promise<ReferenceDto> {
		const reference = await this.referencesService.remove({
			where: {
				id: +id,
			},
		});
		const referenceDto =
			await this.referencesService.getReferenceDto(reference);
		return referenceDto;
	}

	@Post(':id/contacts')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: ContactDto,
	})
	async addContact(
		@Request() req: any,
		@Param('id') id: string,
		@Body() createContactDto: CreateContactDto,
	): Promise<ContactDto> {
		const { user: _ } = req;
		const contact = await this.referencesService.createContact({
			data: {
				...createContactDto,
				reference: {
					connect: {
						id: +id,
					},
				},
			},
		});
		const contactDto = await this.referencesService.getContactDto(contact);
		return contactDto;
	}
}
