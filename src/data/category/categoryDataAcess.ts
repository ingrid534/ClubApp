import { PrismaClient } from '../../generated/prisma/client.js';
import type { CategoryDataAccessInterface } from './catagoryDataAccessInterface.js';
import type { Category } from '../../model/CategoryModel.js';
import type { Club } from '../../model/ClubModel.js';

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

  async getClubsByCatagory(catagoryId: string): Promise<Club[]> {
    const response = await this.prisma.clubCategories.findMany({
      where: { categoryId: catagoryId },
      select: {
        club: {
          select: {
            id: true,
            name: true,
            organizerId: true,
            registered: true,
          },
        },
      },
    });

    return response.map((clubCategory) => clubCategory.club);
  }

  async addClubCatagory(clubId: string, catagory: string): Promise<void> {
    await this.prisma.clubCategories.create({
      data: {
        clubId: clubId,
        categoryId: catagory,
      },
    });
  }

  async deleteClubCatagory(clubId: string, catagory: string): Promise<void> {
    await this.prisma.clubCategories.deleteMany({
      where: {
        clubId: clubId,
        categoryId: catagory,
      },
    });
  }

  async updateClubCatagories(
    clubId: string,
    catagoryIds: string[],
  ): Promise<void> {
    // delete all categories
    await this.prisma.clubCategories.deleteMany({
      where: { clubId: clubId },
    });

    await this.prisma.clubCategories.createMany({
      data: catagoryIds.map((categoryId) => ({
        clubId: clubId,
        categoryId: categoryId,
      })),
    });
  }
}
