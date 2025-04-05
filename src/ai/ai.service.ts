import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatTogetherAI } from '@langchain/community/chat_models/togetherai';
import { AiConfig } from './ai.config';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class AiService implements OnModuleInit {
	protected llm: ChatTogetherAI;
	protected embedder: HuggingFaceTransformersEmbeddings;

	constructor(readonly aiConfig: AiConfig) {
		this.llm = new ChatTogetherAI({
			model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
			temperature: 0,
			maxRetries: 2,
			apiKey: aiConfig.apiKey,
		});
		this.embedder = new HuggingFaceTransformersEmbeddings({
			model: 'sentence-transformers/all-mpnet-base-v2',
		});
	}

	getEmbedder() {
		return this.embedder;
	}

	async onModuleInit() {
		try {
			console.log('Warming up embedding model...');
			await this.embedder.embedQuery('Warm-up query');
			console.log('Embedding model ready.');
		} catch (error) {
			console.error('Error warming up embedding model:', error);
		}
	}

	async sendMessage(message: string, context?: string) {
		const messages = [
			new SystemMessage(
				`Ответь на вопрос на пользователя основываясь на предоставленном контексте и том что ты знаешь: ${context ?? ''}`,
			),
			new HumanMessage(message),
		];
		return (await this.llm.invoke(messages)).content;
	}

	async createEmbedding(text: string) {
		const embedding = await this.embedder.embedQuery(text);
		return embedding;
	}
}
