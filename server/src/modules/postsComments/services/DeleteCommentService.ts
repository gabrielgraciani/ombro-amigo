import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import PostComment from '../models/PostComment';

interface Request {
  id: string;
  user_id: string;
}

class DeleteCommentService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const postsCommentsRepository = getRepository(PostComment);
    const postComment = await postsCommentsRepository.findOne({
      where: {
        id,
      },
    });

    if (!postComment) {
      throw new AppError('Comment not found', 404);
    }

    if (postComment.user_id !== user_id) {
      throw new AppError(
        "You can't delete a comment that you didn't create",
        401,
      );
    }

    await postsCommentsRepository.delete({ id });
  }
}

export default DeleteCommentService;
