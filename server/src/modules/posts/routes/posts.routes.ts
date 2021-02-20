import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.get('/', postsController.show);
postsRouter.post('/', ensureAuthenticated, postsController.create);

export default postsRouter;
