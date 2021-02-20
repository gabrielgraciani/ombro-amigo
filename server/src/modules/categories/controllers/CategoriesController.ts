import { Request, Response } from 'express';

import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';

export default class CategoriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listCategories = new ListCategoriesService();
    const categories = await listCategories.execute();

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();
    const category = await createCategory.execute({
      name,
      imageFilename: request.file.filename,
    });

    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = new DeleteCategoryService();
    await deleteCategory.execute({
      id,
    });

    return response.send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const filename = request.file !== undefined ? request.file.filename : '';

    const updateCategory = new UpdateCategoryService();
    const updatedCategory = await updateCategory.execute({
      id,
      name,
      imageFilename: filename,
    });

    return response.json(updatedCategory);
  }
}
