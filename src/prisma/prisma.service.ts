import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
		await this.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector;`;
		await this.$executeRaw`CREATE EXTENSION IF NOT EXISTS pg_trgm;`;
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
