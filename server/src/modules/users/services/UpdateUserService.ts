import { getRepository } from 'typeorm';

import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import User from '../models/User';

const cache = new RedisCache();

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdatePostService {
  public async execute({ id, name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      id,
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await usersRepository.save(user);
    await cache.invalidate('users-list');

    return user;
  }
}

export default UpdatePostService;
