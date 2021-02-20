import { Request, Response } from 'express';

import ManageLikeService from '@modules/postsAction/services/ManageLikeService';
import ListLikesService from '@modules/postsAction/services/ListLikesService';
import FindLikesPerPostService from '@modules/postsAction/services/FindLikesPerPostService';

export default class PostLikeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listLikes = new ListLikesService();
    const likes = await listLikes.execute();

    return response.json(likes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;

    const manageLike = new ManageLikeService();

    const like = await manageLike.execute({ user_id, post_id });

    return response.json(like);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;

    const findLikes = new FindLikesPerPostService();
    const likes = await findLikes.execute({ user_id, post_id });

    return response.json(likes);
  }
}
