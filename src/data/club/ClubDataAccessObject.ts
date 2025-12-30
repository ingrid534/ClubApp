import type ClubDataAccessInterface from './ClubDataAccessInterface.js';
import type { Club } from '../../models/ClubModel.js';
import type { User } from '../../models/UserModel.js';
import type { Event } from '../../models/EventModel.js';
import prisma from '../../config/client.js';

export default class ClubDataAccessObject implements ClubDataAccessInterface {
  async getClubById(clubId: string): Promise<Club | null> {
    return await prisma.club.findUnique({
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
    const response: Club[] = await prisma.club.findMany({
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
    const response: Club[] = await prisma.club.findMany({
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
      const club: Club = await prisma.club.create({
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
      const club: Club = await prisma.club.update({
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
    const deletedClub = await prisma.club.delete({
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
    const response = await prisma.club.findUnique({
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
    const response = await prisma.club.update({
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
    const response = await prisma.clubFollowing.findMany({
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
    const response = await prisma.club.findUnique({
      where: { id: clubId },
      select: { registered: true },
    });
    return response ? response.registered : false;
  }

  async listEvents(clubId: string): Promise<Event[]> {
    const response = await prisma.club.findUnique({
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
