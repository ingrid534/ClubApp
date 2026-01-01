import { Router } from 'express';
import checkJwt from '../middlewares/checkJwt.js';
import CategoryDataAccess from '../data/category/categoryDataAcess.js';
import CategoryService from '../services/categoryService.js';
import CategoryController from '../controllers/categoryController.js';

const categoryRouter = Router();
const categoryDataAccessObject = new CategoryDataAccess();
const categoryService = new CategoryService(categoryDataAccessObject);
const categoryController = new CategoryController(categoryService);

categoryRouter.get('/', categoryController.getCatagories);

categoryRouter.get('/:categoryId/clubs', categoryController.getClubsByCatagory);

categoryRouter.post('/:clubId', checkJwt, categoryController.addClubCatagory);

categoryRouter.put(
  '/:clubId',
  checkJwt,
  categoryController.updateClubCatagories,
);

categoryRouter.delete(
  '/:clubId',
  checkJwt,
  categoryController.deleteClubCatagory,
);

export default categoryRouter;
