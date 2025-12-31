import type CategoryDataAccessInterface from '../data/category/catagoryDataAccessInterface.js';
import type { Category } from '../models/CategoryModel.js';

export default class CategoryService {
  private categoryDao: CategoryDataAccessInterface;
  constructor(categoryDao: CategoryDataAccessInterface) {
    this.categoryDao = categoryDao;
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryDao.getCatagories();
  }

  async getClubsByCategory(categoryId: string) {
    return await this.categoryDao.getClubsByCatagory(categoryId);
  }

  async addClubCategory(clubId: string, categoryId: string) {
    return await this.categoryDao.addClubCatagory(clubId, categoryId);
  }

  async deleteClubCatagory(clubId: string, categoryId: string) {
    return await this.categoryDao.deleteClubCatagory(clubId, categoryId);
  }

  async updateClubCategories(clubId: string, categoryIds: string[]) {
    return await this.categoryDao.updateClubCatagories(clubId, categoryIds);
  }
}
