import { Router } from 'express';

import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import postsRouter from '@modules/posts/routes/posts.routes';
import postLikeRouter from '@modules/postsAction/routes/postLike.routes';
import postDeslikeRouter from '@modules/postsAction/routes/postDeslike.routes';
import categoriesRouter from '@modules/categories/routes/categories.routes';
import postsCommentsRouter from '@modules/postsComments/routes/postsComments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/posts', postsRouter);
routes.use('/like', postLikeRouter);
routes.use('/deslike', postDeslikeRouter);
routes.use('/categories', categoriesRouter);
routes.use('/comments', postsCommentsRouter);

export default routes;
