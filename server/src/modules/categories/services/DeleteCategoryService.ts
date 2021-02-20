import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import Category from '../models/Category';

const cache = new RedisCache();

interface Request {
  id: string;
}

class DeleteCategoryService {
  public async execute({ id }: Request): Promise<void> {
    const categoriesRepository = getRepository(Category);
    const category = await categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

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

    await categoriesRepository.delete({ id });
    await cache.invalidate('categories-list');
  }
}

export default DeleteCategoryService;
