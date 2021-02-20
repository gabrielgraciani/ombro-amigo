import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/models/User';
import Post from '@modules/posts/models/Post';

import PostAction from '../models/PostAction';

interface Request {
  user_id: string;
  post_id: string;
}

class ManageLikeService {
  // eslint-disable-next-line consistent-return
  public async execute({
    user_id,
    post_id,
  }: Request): Promise<PostAction | void> {
    const postsActionRepository = getRepository(PostAction);
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

    const findLike = await postsActionRepository.findOne({
      where: {
        user_id,
        post_id,
        operation: 'like',
      },
    });

    if (findLike) {
      await postsActionRepository.delete({ id: findLike.id });
    } else {
      const postAction = postsActionRepository.create({
        post_id,
        user_id,
        operation: 'like',
      });

      await postsActionRepository.save(postAction);

      return postAction;
    }
  }
}

export default ManageLikeService;
