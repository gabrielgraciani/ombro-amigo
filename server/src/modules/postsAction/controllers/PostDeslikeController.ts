import { Request, Response } from 'express';

import ManageDeslikeService from '@modules/postsAction/services/ManageDeslikeService';
import ListDeslikesService from '@modules/postsAction/services/ListDeslikesService';
import FindDeslikesPerPostService from '@modules/postsAction/services/FindDeslikesPerPostService';

export default class PostDeslikeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listDeslikes = new ListDeslikesService();
    const deslikes = await listDeslikes.execute();

    return response.json(deslikes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;

    const manageDeslike = new ManageDeslikeService();

    const deslike = await manageDeslike.execute({ user_id, post_id });

    return response.json(deslike);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;

    const findDeslikes = new FindDeslikesPerPostService();
    const deslikes = await findDeslikes.execute({ user_id, post_id });

    return response.json(deslikes);
  }
}
