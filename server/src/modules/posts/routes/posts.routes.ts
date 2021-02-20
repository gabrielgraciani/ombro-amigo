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
postsRouter.put(
  '/:id',
  ensureAuthenticated,
  upload.single('audio'),
  postsController.update,
);
postsRouter.delete('/:id', ensureAuthenticated, postsController.delete);

export default postsRouter;
