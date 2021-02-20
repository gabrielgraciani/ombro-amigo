import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

import PostDeslikeController from '../controllers/PostDeslikeController';

const postsActionRouter = Router();
const postDeslikeController = new PostDeslikeController();

postsActionRouter.get('/', ensureAuthenticated, postDeslikeController.show);
postsActionRouter.post(
  '/:post_id',
  ensureAuthenticated,
  postDeslikeController.create,
);
postsActionRouter.get(
  '/post/:post_id',
  ensureAuthenticated,
  postDeslikeController.find,
);

export default postsActionRouter;
