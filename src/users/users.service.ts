import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(args: Prisma.UserCreateArgs) {
		const user = await this.prisma.user.create(args);
		return user;
	}

	async findMany(args?: Prisma.UserFindManyArgs) {
		const users = await this.prisma.user.findMany(args);
		return users;
	}

	async findFirst(args?: Prisma.UserFindFirstArgs) {
		const user = await this.prisma.user.findFirst(args);
		return user;
	}

	async findUnique(args: Prisma.UserFindUniqueArgs) {
		const user = await this.prisma.user.findUnique(args);
		return user;
	}

	async update(args: Prisma.UserUpdateArgs) {
		const user = await this.prisma.user.update(args);
		return user;
	}

	async remove(args: Prisma.UserDeleteArgs) {
		const user = await this.prisma.user.delete(args);
		return user;
	}

	async findOrCreateUser(tel: string): Promise<User> {
		const existingUser = await this.prisma.user.findUnique({
			where: {
				tel: tel,
			},
		});
		if (existingUser) {
			return existingUser;
		}
		return await this.create({
			data: {
				tel: tel,
			},
		});
	}
}
