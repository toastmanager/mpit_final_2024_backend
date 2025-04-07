import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AiModule } from '../ai/ai.module';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [AiModule, UsersModule],
	controllers: [ArticlesController],
	providers: [ArticlesService],
})
export class ArticlesModule {}
