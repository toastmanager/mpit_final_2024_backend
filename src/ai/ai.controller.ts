import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateEmbeddingDto } from './dto/create-embedding.dto';

@Controller('ai')
export class AiController {
	constructor(private readonly aiService: AiService) {}

	// @Post('message')
	// @ApiOkResponse({
	// 	type: String,
	// })
	// sendMessage(@Body() sendMessageDto: SendMessageDto) {
	// 	return this.aiService.sendMessage(
	// 		sendMessageDto.message,
	// 		undefined,
	// 		sendMessageDto.history,
	// 	);
	// }

	// @Post('embedding')
	// @ApiOkResponse({
	// 	type: String,
	// })
	// createEmbedding(@Body() createEmbeddingDto: CreateEmbeddingDto) {
	// 	return this.aiService.createEmbedding(createEmbeddingDto.text);
	// }
}
