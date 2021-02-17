import { Router } from 'express';

import PostsController from '../controllers/PostsController';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.get('/', postsController.show);

export default postsRouter;
