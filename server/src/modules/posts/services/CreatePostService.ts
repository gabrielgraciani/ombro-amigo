import { getRepository } from 'typeorm';

import Category from '@modules/categories/models/Category';
import User from '@modules/users/models/User';
import RedisCache from '@shared/cache/RedisCache';

import AppError from '@shared/errors/AppError';

import Post from '../models/Post';

interface Request {
  user_id: string;
  category_id: string;
  message: string;
  audio: string;
}

const cache = new RedisCache();

class CreatePostService {
  public async execute({
    user_id,
    category_id,
    message,
    audio,
  }: Request): Promise<Post> {
    const postsRepository = getRepository(Post);
    const usersRepository = getRepository(User);
    const categoriesRepository = getRepository(Category);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can create post.', 401);
    }

    const category = await categoriesRepository.findOne(category_id);

    if (!category) {
      throw new AppError('Category was not found.', 404);
    }

    const post = postsRepository.create({
      user_id,
      category_id,
      message,
      audio,
    });

    await postsRepository.save(post);
    await cache.invalidate('posts-list');

    return post;
  }
}

export default CreatePostService;
