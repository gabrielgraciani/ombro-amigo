import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/models/User';
import Post from '@modules/posts/models/Post';
import PostComment from '../models/PostComment';

interface Request {
  post_id: string;
  user_id: string;
}

class FindCommentsPerPostService {
  public async execute({ post_id, user_id }: Request): Promise<PostComment[]> {
    const postsCommentsRepository = getRepository(PostComment);
    const postsRepository = getRepository(Post);
    const usersRepository = getRepository(User);

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

    const comments = await postsCommentsRepository.find({
      where: {
        post_id,
      },
    });

    return comments;
  }
}

export default FindCommentsPerPostService;
