import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import RedisCache from '@shared/cache/RedisCache';

import User from '@modules/users/models/User';
import Post from '@modules/posts/models/Post';
import PostComment from '../models/PostComment';

interface Request {
  post_id: string;
  user_id: string;
}

const cache = new RedisCache();

class FindCommentsPerPostService {
  public async execute({ post_id, user_id }: Request): Promise<PostComment[]> {
    const postsCommentsRepository = getRepository(PostComment);
    const postsRepository = getRepository(Post);
    const usersRepository = getRepository(User);

    let comments = await cache.recover<PostComment[]>(
      `posts-comments-list:${post_id}`,
    );

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can see the likes of this post.',
        401,
      );
    }

    const post = await postsRepository.findOne(post_id);

    if (!post) {
      throw new AppError('Post was not found.', 404);
    }

    if (!comments) {
      comments = await postsCommentsRepository.find({
        where: {
          post_id,
        },
      });

      await cache.save(`posts-comments-list:${post_id}`, comments);
    }

    return comments;
  }
}

export default FindCommentsPerPostService;
