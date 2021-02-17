import { getRepository } from 'typeorm';

import RedisCache from '@shared/cache/RedisCache';
import Post from '../models/Post';

const cache = new RedisCache();

class ListPostsService {
  public async execute(): Promise<Post[]> {
    let posts = await cache.recover<Post[]>('posts-list');

    if (!posts) {
      const postsRepository = getRepository(Post);
      posts = await postsRepository.find();

      await cache.save('posts-list', posts);
    }

    return posts;
  }
}

export default ListPostsService;
