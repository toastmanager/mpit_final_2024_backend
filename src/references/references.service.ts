import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Contact, Prisma, Reference } from '@prisma/client';
import { ReferenceDto } from './dto/reference.dto';
import { removeNullFields } from '../utils';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ReferencesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(args: Prisma.ReferenceCreateArgs) {
		const reference = await this.prisma.reference.create(args);
		return reference;
	}

	async findMany(args?: Prisma.ReferenceFindManyArgs) {
		const references = await this.prisma.reference.findMany(args);
		return references;
	}

	async findFirst(args?: Prisma.ReferenceFindFirstArgs) {
		const reference = await this.prisma.reference.findFirst(args);
		return reference;
	}

	async findUnique(args: Prisma.ReferenceFindUniqueArgs) {
		const reference = await this.prisma.reference.findUnique(args);
		return reference;
	}

	async update(args: Prisma.ReferenceUpdateArgs) {
		const reference = await this.prisma.reference.update(args);
		return reference;
	}

	async remove(args: Prisma.ReferenceDeleteArgs) {
		const reference = await this.prisma.reference.delete(args);
		return reference;
	}

	async getReferenceDto(reference: Reference): Promise<ReferenceDto> {
		return removeNullFields(reference);
	}

	async getReferenceDtos(references: Reference[]): Promise<ReferenceDto[]> {
		const referenceDtos: ReferenceDto[] = [];
		for (const reference of references) {
			const referenceDto = await this.getReferenceDto(reference);
			if (referenceDto) referenceDtos.push(referenceDto);
		}
		return referenceDtos;
	}

	async getContactDto(contact: Contact): Promise<ContactDto> {
		return removeNullFields(contact);
	}

	async createContact(args: Prisma.ContactCreateArgs): Promise<Contact> {
		const contact = await this.prisma.contact.create(args);
		return contact;
	}

	async removeContact(id: number): Promise<Contact> {
		const contact = await this.prisma.contact.delete({
			where: {
				id: id,
			},
		});
		return contact;
	}
}
