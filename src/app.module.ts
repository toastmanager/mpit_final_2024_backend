import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigifyModule } from '@itgorillaz/configify';
import { AiModule } from './ai/ai.module';
import { ArticlesModule } from './articles/articles.module';
import { HelpRequestsModule } from './help-requests/help-requests.module';

@Module({
	imports: [
		PrismaModule,
		ConfigifyModule.forRootAsync(),
		AuthModule,
		UsersModule,
		AiModule,
		ArticlesModule,
		HelpRequestsModule,
	],
})
export class AppModule {}
