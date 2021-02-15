import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (req, res) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();

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
