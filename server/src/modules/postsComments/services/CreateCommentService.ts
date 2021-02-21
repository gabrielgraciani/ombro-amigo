import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

import User from '@modules/users/models/User';
import Post from '@modules/posts/models/Post';

import PostComment from '../models/PostComment';

interface Request {
  user_id: string;
  post_id: string;
  message: string;
}

const cache = new RedisCache();

class CreateCommentService {
  public async execute({
    user_id,
    post_id,
    message,
  }: Request): Promise<PostComment> {
    const postsCommentsRepository = getRepository(PostComment);
    const postsRepository = getRepository(Post);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can like this post.', 401);
    }

    const post = await postsRepository.findOne(post_id);

    if (!post) {
      throw new AppError('Post was not found.', 404);
    }

    if (!message) {
      throw new AppError('Write an message', 400);
    }

    const postMessage = postsCommentsRepository.create({
      post_id,
      user_id,
      message,
    });

    await postsCommentsRepository.save(postMessage);
    await cache.invalidatePrefix('posts-comments-list');

    return postMessage;
  }
}

export default CreateCommentService;
