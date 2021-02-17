import { getRepository } from 'typeorm';

import RedisCache from '@shared/cache/RedisCache';
import User from '../models/User';

const cache = new RedisCache();

class ListUsersService {
  public async execute(): Promise<User[]> {
    let users = await cache.recover<User[]>('users-list');

    if (!users) {
      const usersRepository = getRepository(User);
      users = await usersRepository.find();

      await cache.save('users-list', users);
    }

    return users;
  }
}

export default ListUsersService;
