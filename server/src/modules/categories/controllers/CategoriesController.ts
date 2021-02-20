import { Request, Response } from 'express';

import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

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
}
