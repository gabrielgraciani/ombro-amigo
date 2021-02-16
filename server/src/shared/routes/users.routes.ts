import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import User from '@modules/users/models/User';

import RedisCache from '@shared/cache/RedisCache';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const cache = new RedisCache();

usersRouter.get('/', async (req, res) => {
  let users = await cache.recover<User[]>('users-list');

  if (!users) {
    const usersRepository = getCustomRepository(UsersRepository);
    users = await usersRepository.find();

    await cache.save('users-list', users);
  }

  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  },
);

export default usersRouter;
