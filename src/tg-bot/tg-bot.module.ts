import { Module } from '@nestjs/common';
import { TgBotService } from './tg-bot.service';
import { TgBotUpdate } from './tg-bot.update';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { HelpRequestsModule } from '../help-requests/help-requests.module';

const telegrafSessions = new LocalSession({ database: 'sessions_db.json' });

@Module({
	imports: [
		TelegrafModule.forRoot({
			middlewares: [telegrafSessions.middleware()],
			token: process.env.TELEGRAM_TOKEN as string,
		}),
		HelpRequestsModule,
	],
	providers: [TgBotService, TgBotUpdate],
})
export class TgBotModule {}
