import { getRepository } from 'typeorm';

import Chat from '../models/Chat';

class ListChatsService {
  public async execute(): Promise<Chat[]> {
    const chatsRepository = getRepository(Chat);
    const chats = await chatsRepository.find();

    return chats;
  }
}

export default ListChatsService;
