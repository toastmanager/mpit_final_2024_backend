import { StorageRepository } from '../storage/storage';

export class ArticleBannersStorage extends StorageRepository {
	protected getBucketName(): string {
		return 'article-banners';
	}
}
