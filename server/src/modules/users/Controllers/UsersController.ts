import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '@modules/users/services/CreateUserService';
import User from '@modules/users/models/User';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import RedisCache from '@shared/cache/RedisCache';

const cache = new RedisCache();

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    let users = await cache.recover<User[]>('users-list');

    if (!users) {
      const usersRepository = getCustomRepository(UsersRepository);
      users = await usersRepository.find();

      await cache.save('users-list', users);
    }

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }
}
