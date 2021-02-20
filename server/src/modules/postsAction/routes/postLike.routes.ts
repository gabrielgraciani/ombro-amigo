import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

import PostLikeController from '../controllers/PostLikeController';

const postsActionRouter = Router();
const postLikeController = new PostLikeController();

postsActionRouter.get('/', ensureAuthenticated, postLikeController.show);
postsActionRouter.post(
  '/:post_id',
  ensureAuthenticated,
  postLikeController.create,
);
postsActionRouter.get(
  '/post/:post_id',
  ensureAuthenticated,
  postLikeController.find,
);

export default postsActionRouter;
