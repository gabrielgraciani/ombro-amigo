import { Request, Response } from 'express';

import ListPostsService from '@modules/posts/services/ListPostsService';
import CreatePostService from '@modules/posts/services/CreatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { category_id, message } = request.body;
    const { id: user_id } = request.user;

    const filename = request.file !== undefined ? request.file.filename : '';

    const updatePost = new UpdatePostService();
    const updatedPost = await updatePost.execute({
      id,
      user_id,
      category_id,
      message: message || '',
      audio: filename,
    });

    return response.json(updatedPost);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const deletePost = new DeletePostService();
    await deletePost.execute({
      id,
      user_id,
    });

    return response.send();
  }
}
