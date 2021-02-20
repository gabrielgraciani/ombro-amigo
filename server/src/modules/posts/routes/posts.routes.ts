import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';

const postsRouter = Router();
const postsController = new PostsController();
const upload = multer(uploadConfig.audio);

postsRouter.get('/', postsController.show);
postsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('audio'),
  postsController.create,
);

export default postsRouter;
