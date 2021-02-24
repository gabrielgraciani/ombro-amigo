import { getRepository } from 'typeorm';

import ChatMessage from '../models/ChatMessage';

class ListChatsMessagesService {
  public async execute(): Promise<ChatMessage[]> {
    const chatsMessagesRepository = getRepository(ChatMessage);
    const chatsMessages = await chatsMessagesRepository.find();

    return chatsMessages;
  }
}

export default ListChatsMessagesService;
