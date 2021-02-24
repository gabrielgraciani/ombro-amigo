import { Request, Response } from 'express';

import ListChatsService from '@modules/chats/services/ListChatsService';
import CreateChatService from '@modules/chats/services/CreateChatService';

export default class ChatsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listChats = new ListChatsService();

    const chats = await listChats.execute();

    return response.json(chats);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id_has_received_chat } = request.body;
    const { id: user_id_has_created_chat } = request.user;

    const createChat = new CreateChatService();

    const chat = await createChat.execute({
      user_id_has_created_chat,
      user_id_has_received_chat,
    });

    return response.json(chat);
  }
}
