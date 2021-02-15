import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

// rota de teste para pessoa autenticada
routes.use(ensureAuthenticated);
routes.get('/only-authenticated-users', (req, res) => {
  return res.json({ message: 'hello world' });
});

export default routes;
