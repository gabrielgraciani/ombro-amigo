import { getRepository } from 'typeorm';

import RedisCache from '@shared/cache/RedisCache';
import Category from '../models/Category';

const cache = new RedisCache();

class ListCategoriesService {
  public async execute(): Promise<Category[]> {
    let categories = await cache.recover<Category[]>('categories-list');

    if (!categories) {
      const categoriesRepository = getRepository(Category);
      categories = await categoriesRepository.find();

      await cache.save('categories-list', categories);
    }

    return categories;
  }
}

export default ListCategoriesService;
