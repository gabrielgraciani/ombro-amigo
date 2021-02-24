import { Request, Response } from 'express';

import ListChatsMessagesService from '@modules/chatsMessages/services/ListChatsMessagesService';
import CreateChatMessageService from '@modules/chatsMessages/services/CreateChatMessageService';

export default class ChatsMessagesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listChatMessages = new ListChatsMessagesService();

    const chatMessages = await listChatMessages.execute();

    return response.json(chatMessages);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { chat_id } = request.params;
    const { message } = request.body;
    const { id: user_id } = request.user;

    const createChatMessage = new CreateChatMessageService();

    const chatMessage = await createChatMessage.execute({
      user_id,
      chat_id,
      message,
    });

    return response.json(chatMessage);
  }
}
