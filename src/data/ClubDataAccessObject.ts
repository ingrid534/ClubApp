import { PrismaClient } from '../generated/prisma/client.js';
import type { ClubDataAccessInterface } from './ClubDataAccessInterface.js';
import type { ClubInputData } from './ClubInputData.js';
import type { Club } from '../model/ClubModel.js';

export class ClubDataAccessObject implements ClubDataAccessInterface {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getById(clubId: string): Promise<Club | null> {
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

  async getByIds(clubIds: string[]): Promise<Club[]> {
    const response: Club[] = await this.prisma.club.findMany({
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

  async create(data: ClubInputData): Promise<Club | null> {
    // Create club
    const club: Club = await this.prisma.club.create({
      data: {
        name: data.name,
        organizerId: data.organizerId,
      },
      select: {
        id: true,
        name: true,
        organizerId: true,
        registered: true,
      },
    });

    if (club) {
      // Update user's organized clubs
      const organizerId = data.organizerId;
      await this.prisma.user.update({
        where: { id: organizerId },
        data: {
          organizedClubs: {
            connect: { id: organizerId },
          },
        },
      });
    }

    return club;
  }

  async update(data: Club): Promise<Club> {
    return await this.prisma.club.update({
      where: { id: data.id },
      data: {
        name: data.name,
        registered: data.registered,
      },
      select: {
        id: true,
        name: true,
        organizerId: true,
        registered: true,
      },
    });
  }

  async delete(clubId: string) {
    await this.prisma.club.delete({
      where: { id: clubId },
    });
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

  async updateOrganizer(clubId: string, organizerId: string) {
    const previousOrganizerId: string =
      (
        await this.prisma.club.findUnique({
          where: { id: clubId },
          select: { organizerId: true },
        })
      )?.organizerId || '';

    // update club's organizer
    const response = await this.prisma.club.update({
      where: { id: clubId },
      data: {
        organizerId: organizerId,
      },
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

    // update user's organized clubs
    if (response.organizer) {
      await this.prisma.user.update({
        where: { id: organizerId },
        data: {
          organizedClubs: {
            connect: { id: clubId },
          },
        },
      });

      await this.prisma.user.update({
        where: { id: previousOrganizerId },
        data: {
          organizedClubs: {
            disconnect: { id: clubId },
          },
        },
      });
    }

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
