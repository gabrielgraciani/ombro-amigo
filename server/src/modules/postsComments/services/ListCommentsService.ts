import { getRepository } from 'typeorm';

import RedisCache from '@shared/cache/RedisCache';
import PostComment from '../models/PostComment';

const cache = new RedisCache();

class ListCommentsService {
  public async execute(): Promise<PostComment[]> {
    let comments = await cache.recover<PostComment[]>('posts-comments-list');

    if (!comments) {
      const postsCommentsRepository = getRepository(PostComment);
      comments = await postsCommentsRepository.find();

      await cache.save('posts-comments-list', comments);
    }

    return comments;
  }
}

export default ListCommentsService;
