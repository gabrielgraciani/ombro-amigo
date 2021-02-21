import { getRepository } from 'typeorm';

import User from '@modules/users/models/User';

import AppError from '@shared/errors/AppError';

import Chat from '../models/Chat';

interface Request {
  user_id_has_created_chat: string;
  user_id_has_received_chat: string;
}

class CreateChatService {
  public async execute({
    user_id_has_created_chat,
    user_id_has_received_chat,
  }: Request): Promise<Chat> {
    const chatsRepository = getRepository(Chat);
    const usersRepository = getRepository(User);

    const userHasCreatedChat = await usersRepository.findOne(
      user_id_has_created_chat,
    );

    if (!userHasCreatedChat) {
      throw new AppError('Only authenticated users can create post.', 401);
    }

    const userHasReceivedChat = await usersRepository.findOne(
      user_id_has_received_chat,
    );

    if (!userHasReceivedChat) {
      throw new AppError('User not found', 404);
    }

    if (user_id_has_created_chat === user_id_has_received_chat) {
      throw new AppError("You can't chat with yourself", 403);
    }

    const chat = chatsRepository.create({
      user_id_has_created_chat,
      user_id_has_received_chat,
    });

    await chatsRepository.save(chat);

    return chat;
  }
}

export default CreateChatService;
