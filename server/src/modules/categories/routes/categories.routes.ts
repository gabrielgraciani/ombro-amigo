import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();
const upload = multer(uploadConfig.image);

categoriesRouter.get('/', categoriesController.show);
categoriesRouter.post('/', upload.single('image'), categoriesController.create);
categoriesRouter.delete('/:id', categoriesController.delete);
categoriesRouter.put(
  '/:id',
  upload.single('image'),
  categoriesController.update,
);

export default categoriesRouter;
