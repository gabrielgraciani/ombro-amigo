import { Request, Response } from 'express';

import ManageDeslikeService from '@modules/postsAction/services/ManageDeslikeService';
import ListDeslikesService from '@modules/postsAction/services/ListDeslikesService';
import FindDeslikesPerPostService from '@modules/postsAction/services/FindDeslikesPerPostService';

export default class PostDeslikeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listDeslikes = new ListDeslikesService();
    const likes = await listDeslikes.execute();

    return response.json(likes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;

    const manageDeslike = new ManageDeslikeService();

    const like = await manageDeslike.execute({ user_id, post_id });

    return response.json(like);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;

    const findDeslikes = new FindDeslikesPerPostService();
    const likes = await findDeslikes.execute({ user_id, post_id });

    return response.json(likes);
  }
}
