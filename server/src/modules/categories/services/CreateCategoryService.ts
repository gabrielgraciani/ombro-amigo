import { getRepository } from 'typeorm';

import RedisCache from '@shared/cache/RedisCache';

import Category from '../models/Category';

interface Request {
  name: string;
  imageFilename: string;
}

class CreateCategoryService {
  public async execute({ name, imageFilename }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);
    const cache = new RedisCache();

    const category = categoriesRepository.create({
      name,
      image: imageFilename,
    });

    await categoriesRepository.save(category);
    await cache.invalidate('categories-list');

    return category;
  }
}

export default CreateCategoryService;
