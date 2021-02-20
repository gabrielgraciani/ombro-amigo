import { Router } from 'express';

import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import postsRouter from '@modules/posts/routes/posts.routes';
import categoriesRouter from '@modules/categories/routes/categories.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/posts', postsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
