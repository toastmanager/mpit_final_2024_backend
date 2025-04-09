import { Action, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons, helpRequestButtons } from './tg-bot.buttons';
import { HelpRequestsService } from '../help-requests/help-requests.service';

@Update()
export class TgBotUpdate {
	constructor(
		@InjectBot() private readonly bot: Telegraf<Context>,
		private readonly helpRequestsService: HelpRequestsService,
	) {}

	@Start()
	async startCommand(ctx: Context) {
		await ctx.reply('Привет, друг!', actionButtons());
	}

	@Hears('Запросы о помощи')
	@Action('skip')
	async getRequests(ctx: Context) {
		const helpRequest = await this.helpRequestsService.getRandomRequest();
		if (!helpRequest) {
			await ctx.reply('Новые запросы не найдены');
			return;
		}
		await ctx.replyWithHTML(
			`id: ${helpRequest.uuid}\n<b>${helpRequest.title}</b>\n\n${helpRequest.text}`,
			helpRequestButtons(),
		);
	}

	@Action('respond')
	async respondRequest(ctx: Context) {
		//@ts-ignore
		const uuid: stirng = ctx.update.callback_query.message.text
			.split('\n')[0]
			.split(' ')[1];
		//@ts-ignore
		const username: string = ctx.update.callback_query.from.username;
		await this.helpRequestsService.setVolunteer({
			requestUuid: uuid,
			volunteerTg: username,
		});
		await ctx.reply(`Отлично! Вы были привязаны к этому запросу о помощи`);
	}
}
