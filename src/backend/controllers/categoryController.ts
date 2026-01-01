import type { Request, Response, NextFunction } from 'express';
import type { Club } from '../models/ClubModel.js';
import type CategoryService from '../services/categoryService.js';

export default class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  async getCatagories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const categories = await this.categoryService.getCategories();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  async getClubsByCatagory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const categoryId = req.params.categoryId;
      if (!categoryId) {
        return res.status(400).json({ error: 'Category ID is required' });
      }

      const clubs: Club[] =
        await this.categoryService.getClubsByCategory(categoryId);

      res.json(clubs);
    } catch (err) {
      next(err);
    }
  }

  async addClubCatagory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const clubId = req.params.clubId;
      const categoryId = req.body.categoryId;

      if (!clubId || !categoryId) {
        return res
          .status(400)
          .json({ error: 'Both clubId and categoryId are required' });
      }

      await this.categoryService.addClubCategory(clubId, categoryId);
      res.status(201).json({ message: 'Category added to club successfully' });
    } catch (err) {
      next(err);
    }
  }

  async deleteClubCatagory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const clubId = req.params.clubId;
      const categoryId = req.body.categoryId;

      if (!clubId || !categoryId) {
        return res
          .status(400)
          .json({ error: 'Both clubId and categoryId are required' });
      }

      await this.categoryService.deleteClubCatagory(clubId, categoryId);
      res.json({ message: 'Category removed from club successfully' });
    } catch (err) {
      next(err);
    }
  }

  async updateClubCatagories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const clubId = req.params.clubId;
      const categoryIds: string[] = req.body.categoryIds;

      if (!clubId || !categoryIds) {
        return res
          .status(400)
          .json({ error: 'Both clubId and categoryIds are required' });
      }

      this.categoryService.updateClubCategories(clubId, categoryIds);
      res.json({ message: 'Club categories updated successfully' });
    } catch (err) {
      next(err);
    }
  }
}
