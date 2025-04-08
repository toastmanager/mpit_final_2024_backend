import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	NotFoundException,
	InternalServerErrorException,
	UploadedFile,
	Put,
	HttpCode,
	UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiNoContentResponse,
	ApiOkResponse,
} from '@nestjs/swagger';
import { ArticleDto } from './dto/article.dto';
import { createSlug } from '../utils';
import { AskArticlesChatbotDto } from './dto/ask-articles-chatbot.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: ArticleDto,
	})
	async create(
		@Request() req: any,
		@Body() CreateArticleDto: CreateArticleDto,
	) {
		const { user } = req;

		const article = await this.articlesService.create({
			data: {
				...CreateArticleDto,
				author: {
					connect: {
						id: +user.sub,
					},
				},
				slug: createSlug(CreateArticleDto.title),
			},
		});

		const articleEmbedding = await this.articlesService.createEmbedding({
			data: {
				article: {
					connect: {
						id: article.id,
					},
				},
			},
		});

		if (!articleEmbedding) {
			throw new InternalServerErrorException(
				'Failed to create embedding for article',
			);
		}

		await this.articlesService.updateEmbedding({
			articleId: article.id,
			title: article.text,
			text: article.text,
		});

		const articleDto = await this.articlesService.getArticleDto(article);
		return articleDto;
	}

	@Get()
	@ApiOkResponse({
		type: ArticleDto,
		isArray: true,
	})
	async findAll() {
		const articles = await this.articlesService.findMany();
		const articleDtos = await this.articlesService.getArticleDtos(articles);
		return articleDtos;
	}

	@Get(':id')
	@ApiOkResponse({
		type: ArticleDto,
	})
	async findOne(@Param('id') id: string) {
		const article = await this.articlesService.findUnique({
			where: {
				id: +id,
			},
		});
		if (!article) {
			throw new NotFoundException(`Article with id "${id}" not found`);
		}
		await this.articlesService.addViews(+id, 1);
		const articleDto = await this.articlesService.getArticleDto(article);
		return articleDto;
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: ArticleDto,
	})
	async update(
		@Param('id') id: string,
		@Body() updateArticlesDto: UpdateArticleDto,
	) {
		const article = await this.articlesService.update({
			where: {
				id: +id,
			},
			data: updateArticlesDto,
		});

		await this.articlesService.updateEmbedding({
			articleId: article.id,
			text: article.text,
			title: article.title,
		});

		const articleDto = await this.articlesService.getArticleDto(article);
		return articleDto;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({
		type: ArticleDto,
	})
	async remove(@Param('id') id: string) {
		const article = await this.articlesService.remove({
			where: {
				id: +id,
			},
		});

		const articleDto = await this.articlesService.getArticleDto(article);
		return articleDto;
	}

	@Get('chatbot/:query')
	@ApiOkResponse({
		type: String,
	})
	async chatbot(
		@Param('query') query: string,
		@Body() askArticlesChatbotDto: AskArticlesChatbotDto,
	) {
		const response = await this.articlesService.askChatbot(
			query,
			askArticlesChatbotDto.history,
		);
		return response;
	}

	@Get('meaning-search/:query')
	@ApiOkResponse({
		type: ArticleDto,
		isArray: true,
	})
	async meaningSearch(@Param('query') query: string) {
		const foundedArticles = await this.articlesService.findByMeaning(query);
		const articleDtos =
			await this.articlesService.getArticleDtos(foundedArticles);
		return articleDtos;
	}

	@Put(':id/banner')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiNoContentResponse()
	@HttpCode(204)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	@ApiBody({
		required: true,
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	async putBanner(
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		await this.articlesService.uploadBanner(+id, file);
		return;
	}

	@Delete(':id/banner')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(204)
	async deleteBanner(@Request() req: any, @Param('id') id: string) {
		await this.articlesService.deleteBanner(+id);
		return;
	}
}
