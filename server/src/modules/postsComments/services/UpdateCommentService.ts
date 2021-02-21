import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import PostComment from '../models/PostComment';

interface Request {
  id: string;
  user_id: string;
  message: string;
}

const cache = new RedisCache();

class UpdateCommentService {
  public async execute({
    id,
    user_id,
    message,
  }: Request): Promise<PostComment | undefined> {
    const postsCommentsRepository = getRepository(PostComment);

    const postComment = await postsCommentsRepository.findOne({
      id,
    });

    if (!postComment) {
      throw new AppError('Comment not found', 404);
    }

    if (postComment.user_id !== user_id) {
      throw new AppError(
        "You can't update a comment that you didn't create",
        401,
      );
    }

    postComment.message = message;

    await postsCommentsRepository.save(postComment);
    await cache.invalidatePrefix('posts-comments-list');

    return postComment;
  }
}

export default UpdateCommentService;
