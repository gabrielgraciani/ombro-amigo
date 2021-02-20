import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import Post from '../models/Post';

interface Request {
  id: string;
  user_id: string;
}

const cache = new RedisCache();

class DeletePostService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const postsRepository = getRepository(Post);
    const post = await postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user_id !== user_id) {
      throw new AppError("You can't delete a post that you didn't create", 401);
    }

    if (post.audio) {
      const postAudioFilePath = path.join(uploadConfig.directory, post.audio);
      const postAudioFileExists = await fs.promises.stat(postAudioFilePath);

      if (postAudioFileExists) {
        await fs.promises.unlink(postAudioFilePath);
      }
    }

    await postsRepository.delete({ id });
    await cache.invalidate('posts-list');
  }
}

export default DeletePostService;
