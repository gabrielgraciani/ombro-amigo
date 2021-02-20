import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import Category from '@modules/categories/models/Category';

import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Post from '../models/Post';

const cache = new RedisCache();

interface Request {
  id: string;
  user_id: string;
  category_id: string;
  message: string;
  audio: string;
}

class UpdatePostService {
  public async execute({
    id,
    user_id,
    category_id,
    message,
    audio,
  }: Request): Promise<Post | undefined> {
    const postsRepository = getRepository(Post);
    const categoriesRepository = getRepository(Category);

    const post = await postsRepository.findOne({
      id,
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user_id !== user_id) {
      throw new AppError("You can't update a post that you didn't create", 401);
    }

    const category = await categoriesRepository.findOne(category_id);

    if (!category) {
      throw new AppError('Category was not found.', 404);
    }

    if (post.audio) {
      const postAudioFilePath = path.join(uploadConfig.directory, post.audio);
      const postAudioFileExists = await fs.promises.stat(postAudioFilePath);

      if (postAudioFileExists) {
        await fs.promises.unlink(postAudioFilePath);
      }
    }

    post.category_id = category_id;
    post.message = message;
    post.audio = audio;

    await postsRepository.save(post);
    await cache.invalidate('posts-list');

    return post;
  }
}

export default UpdatePostService;
