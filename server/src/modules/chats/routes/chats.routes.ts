import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

import ChatsController from '../controllers/ChatsController';

const chatsRouter = Router();
const chatsController = new ChatsController();

chatsRouter.get('/', ensureAuthenticated, chatsController.show);
chatsRouter.post('/', ensureAuthenticated, chatsController.create);

export default chatsRouter;
