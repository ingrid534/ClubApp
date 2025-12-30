import type CategoryDataAccessInterface from './catagoryDataAccessInterface.js';
import type { Category } from '../../models/CategoryModel.js';
import type { Club } from '../../models/ClubModel.js';
import prisma from '../../config/client.js';

export default class CategoryDataAccess implements CategoryDataAccessInterface {
  async getCatagories(): Promise<Category[]> {
    const categories: Category[] = await prisma.category.findMany({
      select: { id: true, name: true, description: true },
    });

    return categories;
  }

  async getClubsByCatagory(catagoryId: string): Promise<Club[]> {
    const response = await prisma.clubCategories.findMany({
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
    await prisma.clubCategories.create({
      data: {
        clubId: clubId,
        categoryId: catagory,
      },
    });
  }

  async deleteClubCatagory(clubId: string, catagory: string): Promise<void> {
    await prisma.clubCategories.deleteMany({
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
    await prisma.clubCategories.deleteMany({
      where: { clubId: clubId },
    });

    await prisma.clubCategories.createMany({
      data: catagoryIds.map((categoryId) => ({
        clubId: clubId,
        categoryId: categoryId,
      })),
    });
  }
}
