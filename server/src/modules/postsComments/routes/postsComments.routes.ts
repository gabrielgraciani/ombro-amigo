import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

import PostsCommentsController from '../controllers/PostsCommentsController';

const postsCommentsRouter = Router();
const postsCommentsController = new PostsCommentsController();

postsCommentsRouter.get('/', ensureAuthenticated, postsCommentsController.show);
postsCommentsRouter.post(
  '/:post_id',
  ensureAuthenticated,
  postsCommentsController.create,
);
postsCommentsRouter.get(
  '/:post_id',
  ensureAuthenticated,
  postsCommentsController.find,
);
postsCommentsRouter.put(
  '/:id',
  ensureAuthenticated,
  postsCommentsController.update,
);
postsCommentsRouter.delete(
  '/:id',
  ensureAuthenticated,
  postsCommentsController.delete,
);

export default postsCommentsRouter;
