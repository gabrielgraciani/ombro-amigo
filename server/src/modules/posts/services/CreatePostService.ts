import { getRepository } from 'typeorm';

import Category from '@modules/categories/models/Category';
import User from '@modules/users/models/User';

import AppError from '@shared/errors/AppError';

import Post from '../models/Post';

interface Request {
  user_id: string;
  category_id: string;
  message: string;
  audio: string;
}

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
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    const category = await categoriesRepository.findOne(category_id);

    if (!category) {
      throw new AppError('Category was not found.', 404);
    }

    const type = message && !audio ? 'message' : 'audio';

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
