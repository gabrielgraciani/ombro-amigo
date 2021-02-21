import { getRepository } from 'typeorm';

import PostComment from '../models/PostComment';

class ListCommentsService {
  public async execute(): Promise<PostComment[]> {
    const postsCommentsRepository = getRepository(PostComment);
    const comments = await postsCommentsRepository.find();

    return comments;
  }
}

export default ListCommentsService;
