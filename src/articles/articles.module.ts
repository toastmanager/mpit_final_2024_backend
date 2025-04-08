import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AiModule } from '../ai/ai.module';
import { UsersModule } from '../users/users.module';
import { ArticleBannersStorage } from './article-banners.storage';

@Module({
	imports: [AiModule, UsersModule],
	controllers: [ArticlesController],
	providers: [ArticlesService, ArticleBannersStorage],
})
export class ArticlesModule {}
