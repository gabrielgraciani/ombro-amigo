import { getRepository } from 'typeorm';

import User from '@modules/users/models/User';
import Chat from '@modules/chats/models/Chat';

import AppError from '@shared/errors/AppError';

import ChatMessage from '../models/ChatMessage';

interface Request {
  user_id: string;
  chat_id: string;
  message: string;
}

class CreateChatMessageService {
  public async execute({
    user_id,
    chat_id,
    message,
  }: Request): Promise<ChatMessage> {
    const chatsMessagesRepository = getRepository(ChatMessage);
    const usersRepository = getRepository(User);
    const chatsRepository = getRepository(Chat);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can create post.', 401);
    }

    const chat = await chatsRepository.findOne(chat_id);

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    const userHasIncludedOnChat = await chatsRepository.findOne({
      where: [
        {
          user_id_has_created_chat: user_id,
        },
        {
          user_id_has_received_chat: user_id,
        },
      ],
    });

    if (!userHasIncludedOnChat) {
      throw new AppError("You can't type a message to this chat", 401);
    }

    const chatMessage = chatsMessagesRepository.create({
      user_id,
      chat_id,
      message,
    });

    await chatsMessagesRepository.save(chatMessage);

    return chatMessage;
  }
}

export default CreateChatMessageService;
