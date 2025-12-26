import { PrismaClient } from '../../generated/prisma/client.js';
import type { CategoryDataAccessInterface } from './catagoryDataAccessInterface.js';
import type { Category } from '../../model/CategoryModel.js';

export class CategoryDataAccess implements CategoryDataAccessInterface {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getCatagories(): Promise<Category[]> {
    const categories: Category[] = await this.prisma.category.findMany({
      select: { id: true, name: true, description: true },
    });

    return categories;
  }
}
