import { getRepository } from 'typeorm';

import PostAction from '../models/PostAction';

class ListLikesService {
  public async execute(): Promise<PostAction[]> {
    const postsActionRepository = getRepository(PostAction);
    const likes = await postsActionRepository.find({
      where: {
        operation: 'like',
      },
    });

    return likes;
  }
}

export default ListLikesService;
