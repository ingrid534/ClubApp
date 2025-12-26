import { PrismaClient } from '../generated/prisma/client.js';
import type { ClubDataAccessInterface } from './ClubDataAccessInterface.js';
import type { Club } from '../model/ClubModel.js';

export class ClubDataAccessObject implements ClubDataAccessInterface {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getClub(clubId: string): Promise<Club | null> {
    return await this.prisma.club.findUnique({
      where: { id: clubId },
      select: {
        id: true,
        name: true,
        organizerId: true,
        registered: true,
      },
    });
  }

  async getManyClubs(clubIds: string[]): Promise<Club[]> {
    const response = await this.prisma.club.findMany({
      where: { id: { in: clubIds } },
      select: {
        id: true,
        name: true,
        organizerId: true,
        registered: true,
      },
    });
    return response;
  }

  async getOrganizer(clubId: string) {
    const response = await this.prisma.club.findUnique({
      where: { id: clubId },
      select: {
        organizer: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    return response ? response.organizer : null;
  }

  async getClubFollowers(clubId: string) {
    const response = await this.prisma.clubFollowing.findMany({
      where: { clubId: clubId },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    return response.map((item) => item.user);
  }

  async checkClubRegistered(clubId: string) {
    const response = await this.prisma.club.findUnique({
      where: { id: clubId },
      select: { registered: true },
    });
    return response ? response.registered : false;
  }
}
