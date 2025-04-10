import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article, Prisma } from '@prisma/client';
import { ArticleDto } from './dto/article.dto';
import { AiService } from '../ai/ai.service';
import { UsersService } from '../users/users.service';
import { ArticleBannersStorage } from './article-banners.storage';

@Injectable()
export class ArticlesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly usersService: UsersService,
		private readonly articleBanners: ArticleBannersStorage,
		private readonly aiService: AiService,
	) {}

	async create(args: Prisma.ArticleCreateArgs) {
		const article = await this.prisma.article.create(args);
		return article;
	}

	async findMany(args?: Prisma.ArticleFindManyArgs) {
		const articles = await this.prisma.article.findMany(args);
		return articles;
	}

	async findFirst(args?: Prisma.ArticleFindFirstArgs) {
		const article = await this.prisma.article.findFirst(args);
		return article;
	}

	async findUnique(args: Prisma.ArticleFindUniqueArgs) {
		const article = await this.prisma.article.findUnique(args);
		return article;
	}

	async update(args: Prisma.ArticleUpdateArgs) {
		const article = await this.prisma.article.update(args);
		return article;
	}

	async remove(args: Prisma.ArticleDeleteArgs) {
		const article = await this.prisma.article.delete(args);
		return article;
	}

	async getArticleDto(article: Article): Promise<ArticleDto | null> {
		const articleWithAuthor = await this.prisma.article.findUnique({
			where: {
				id: article.id,
			},
			select: {
				author: true,
			},
		});

		if (!articleWithAuthor) {
			return null;
		}

		const bannerUrl = await this.articleBanners.getUrl({
			objectKey: article.id.toString(),
		});

		return {
			...article,
			bannerUrl: bannerUrl,
			author: await this.usersService.getUserDto(articleWithAuthor.author),
		};
	}

	async getArticleDtos(articles: Article[]): Promise<ArticleDto[]> {
		const articlesDtos: ArticleDto[] = [];
		for (const article of articles) {
			const articleDto = await this.getArticleDto(article);
			if (articleDto) articlesDtos.push(articleDto);
		}
		return articlesDtos;
	}

	async createEmbedding(args: Prisma.ArticleEmbeddingCreateArgs) {
		const articleEmbedding = await this.prisma.articleEmbedding.create(args);
		return articleEmbedding;
	}

	async updateEmbedding(args: {
		articleId: number;
		title: string;
		text: string;
	}): Promise<void> {
		const { articleId: id, title, text } = args;
		const embedding = await this.aiService.createEmbedding(
			`${title} | ${text}`,
		);
		const embeddingJSON = JSON.stringify(embedding);
		await this.prisma
			.$executeRaw`UPDATE article_embeddings SET vector = ${embeddingJSON}::vector WHERE article_id = ${id};`;
	}

	async findClosest(
		embedding: number[],
		limit: number = 10,
	): Promise<Article[]> {
		const embeddingString = JSON.stringify(embedding);
		const articles: Article[] = await this.prisma.$queryRaw`
			SELECT
				a.*
			FROM
				articles a
			JOIN
				article_embeddings ae ON a.id = ae.article_id
			ORDER BY
				ae.vector <-> ${embeddingString}::vector ASC
			LIMIT ${limit};
		`;
		return articles;
	}

	async findByMeaning(query: string, limit: number = 10): Promise<Article[]> {
		const queryEmbedding = await this.aiService.createEmbedding(query);
		const foundedArticles: Article[] = await this.findClosest(
			queryEmbedding,
			limit,
		);
		return foundedArticles;
	}

	async askChatbot(query: string, history?: string) {
		const relatedArticles = await this.findByMeaning(query);
		const response = await this.aiService.sendMessage(
			query,
			JSON.stringify(relatedArticles),
			history,
		);
		return response;
	}

	async uploadBanner(id: number, file: Express.Multer.File) {
		await this.articleBanners.put({
			filename: id.toString(),
			file: file.buffer,
			generateFilename: false,
		});
	}

	async deleteBanner(id: number) {
		await this.articleBanners.delete({
			objectKey: id.toString(),
		});
	}

	async addViews(id: number, views: number): Promise<number> {
		const article = await this.prisma.article.update({
			data: {
				views: {
					increment: views,
				},
			},
			where: {
				id: +id,
			},
			select: {
				views: true,
			},
		});

		return article.views;
	}
}
