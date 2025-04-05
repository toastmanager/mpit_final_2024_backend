import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AiModule } from '../ai/ai.module';

@Module({
	imports: [AiModule],
	controllers: [ArticlesController],
	providers: [ArticlesService],
})
export class ArticlesModule {}
