import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Category from '../models/Category';

const cache = new RedisCache();

interface Request {
  id: string;
  name: string;
  imageFilename: string;
}

class DeleteCategoryService {
  public async execute({
    id,
    name,
    imageFilename,
  }: Request): Promise<Category | undefined> {
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne({
      id,
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    if (category.image && imageFilename) {
      const categoryImageFilePath = path.join(
        uploadConfig.directory,
        category.image,
      );
      const categoryImageFileExists = await fs.promises.stat(
        categoryImageFilePath,
      );

      if (categoryImageFileExists) {
        await fs.promises.unlink(categoryImageFilePath);
      }

      category.image = imageFilename;
    }

    category.name = name;

    await categoriesRepository.save(category);
    await cache.invalidate('categories-list');

    return category;
  }
}

export default DeleteCategoryService;
