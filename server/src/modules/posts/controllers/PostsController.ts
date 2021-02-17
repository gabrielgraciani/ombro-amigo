import { Request, Response } from 'express';

import ListPostsService from '@modules/posts/services/ListPostsService';

export default class SessionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listPosts = new ListPostsService();

    const posts = await listPosts.execute();

    return response.json(posts);
  }
}
