import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '@modules/users/controllers/UsersController';
import UserAvatarController from '@modules/users/controllers/UserAvatarController';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig.image);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.get('/', usersController.show);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
