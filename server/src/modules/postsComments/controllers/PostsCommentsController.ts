import { Request, Response } from 'express';

import ListCommentsService from '@modules/postsComments/services/ListCommentsService';
import CreateCommentService from '@modules/postsComments/services/CreateCommentService';
import FindCommentsPerPostService from '@modules/postsComments/services/FindCommentsPerPostService';
import DeleteCommentService from '@modules/postsComments/services/DeleteCommentService';
import UpdateCommentService from '@modules/postsComments/services/UpdateCommentService';

export default class PostsCommentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listComments = new ListCommentsService();
    const comments = await listComments.execute();

    return response.json(comments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;
    const { message } = request.body;

    const createComment = new CreateCommentService();

    const comment = await createComment.execute({ user_id, post_id, message });

    return response.json(comment);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;
    const { id: user_id } = request.user;

    const findComments = new FindCommentsPerPostService();
    const comments = await findComments.execute({ user_id, post_id });

    return response.json(comments);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { message } = request.body;
    const { id: user_id } = request.user;

    const updateComment = new UpdateCommentService();
    const updatedComment = await updateComment.execute({
      id,
      user_id,
      message: message || '',
    });

    return response.json(updatedComment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const deleteComment = new DeleteCommentService();
    await deleteComment.execute({
      id,
      user_id,
    });

    return response.send();
  }
}
