import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';

import ChatsMessagesController from '../controllers/ChatsMessagesController';

const chatsMessagesRouter = Router();
const chatsMessagesController = new ChatsMessagesController();

chatsMessagesRouter.get('/', ensureAuthenticated, chatsMessagesController.show);
chatsMessagesRouter.post(
  '/:chat_id',
  ensureAuthenticated,
  chatsMessagesController.create,
);

export default chatsMessagesRouter;
