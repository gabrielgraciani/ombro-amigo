import { Request, Response } from 'express';

import ListPostsService from '@modules/posts/services/ListPostsService';
import CreatePostService from '@modules/posts/services/CreatePostService';

export default class PostsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listPosts = new ListPostsService();

    const posts = await listPosts.execute();

    return response.json(posts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { category_id, message } = request.body;
    const { id: user_id } = request.user;

    const filename = request.file !== undefined ? request.file.filename : '';

    const createPost = new CreatePostService();
    const post = await createPost.execute({
      user_id,
      category_id,
      message: message || '',
      audio: filename,
    });

    return response.json(post);
  }
}
