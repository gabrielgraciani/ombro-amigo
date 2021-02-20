import { getRepository } from 'typeorm';

import Category from '@modules/categories/models/Category';
import AppError from '@shared/errors/AppError';

import Post from '../models/Post';

interface Request {
  user_id: string;
  category_id: string;
  type: string;
  message: string;
  audio: string;
}

class CreatePostService {
  public async execute({
    user_id,
    category_id,
    type,
    message,
    audio,
  }: Request): Promise<Post> {
    const postsRepository = getRepository(Post);
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(category_id);

    if (!category) {
      throw new AppError('Category was not found.', 404);
    }

    const post = postsRepository.create({
      user_id,
      category_id,
      type,
      message,
      audio,
    });

    await postsRepository.save(post);

    return post;
  }
}

export default CreatePostService;
