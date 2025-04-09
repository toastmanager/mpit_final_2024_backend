import { Markup } from 'telegraf';

export function actionButtons() {
	return Markup.keyboard([
		Markup.button.callback('Запросы о помощи', 'get_request'),
		// Markup.button.callback('Уже помогаю', 'get_request'),
	]);
}

export function helpRequestButtons() {
	return Markup.inlineKeyboard([
		Markup.button.callback('Откликнуться', 'respond'),
		Markup.button.callback('Пропустить', 'skip'),
	]);
}
