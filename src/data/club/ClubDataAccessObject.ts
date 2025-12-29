import { PrismaClient } from '../../generated/prisma/client.js';
import type { ClubDataAccessInterface } from './ClubDataAccessInterface.js';
import type { Club } from '../../model/ClubModel.js';
import type { User } from '../../model/UserModel.js';
import type { Event } from '../../model/EventModel.js';

export class ClubDataAccessObject implements ClubDataAccessInterface {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getClubById(clubId: string): Promise<Club | null> {
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

  async getClubsByIds(clubIds: string[]): Promise<Club[]> {
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

  async getAllClubs(): Promise<Club[]> {
    const response: Club[] = await this.prisma.club.findMany({
      select: {
        id: true,
        name: true,
        organizerId: true,
        registered: true,
      },
    });
    return response;
  }

  async createClub(data: Partial<Club>): Promise<Club | null> {
    try {
      const club: Club = await this.prisma.club.create({
        data: {
          name: data.name!,
          organizerId: data.organizerId!,
          registered: data.registered!,
        },
        select: {
          id: true,
          name: true,
          organizerId: true,
          registered: true,
        },
      });
      return club;
    } catch (err) {
      console.error('Error creating club:', err);
      return null;
    }
  }

  async updateClub(clubId: string, data: Partial<Club>): Promise<Club | null> {
    try {
      const club: Club = await this.prisma.club.update({
        where: { id: clubId },
        data: data,
        select: {
          id: true,
          name: true,
          organizerId: true,
          registered: true,
        },
      });
      return club;
    } catch (err) {
      console.error('Error updating club:', err);
      return null;
    }
  }

  async deleteClub(clubId: string): Promise<Club | null> {
    const deletedClub = await this.prisma.club.delete({
      where: { id: clubId },
      select: {
        id: true,
        name: true,
        organizerId: true,
        registered: true,
      },
    });
    return deletedClub;
  }

  async getOrganizer(clubId: string): Promise<User | null> {
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

  async updateOrganizer(
    clubId: string,
    organizerId: string,
  ): Promise<User | null> {
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

    return response ? response.organizer : null;
  }

  async getClubFollowers(clubId: string): Promise<User[]> {
    const response = await this.prisma.clubFollowing.findMany({
      where: { clubId },
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

  async checkClubRegistered(clubId: string): Promise<boolean> {
    const response = await this.prisma.club.findUnique({
      where: { id: clubId },
      select: { registered: true },
    });
    return response ? response.registered : false;
  }

  async listEvents(clubId: string): Promise<Event[]> {
    const response = await this.prisma.club.findUnique({
      where: { id: clubId },
      select: {
        events: {
          select: {
            id: true,
            name: true,
            description: true,
            date: true,
            location: true,
            clubId: true,
          },
        },
      },
    });

    return response?.events || [];
  }
}
