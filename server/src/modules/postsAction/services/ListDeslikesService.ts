import { getRepository } from 'typeorm';

import PostAction from '../models/PostAction';

class ListDeslikesService {
  public async execute(): Promise<PostAction[]> {
    const postsActionRepository = getRepository(PostAction);
    const likes = await postsActionRepository.find({
      where: { operation: 'deslike' },
    });

    return likes;
  }
}

export default ListDeslikesService;
