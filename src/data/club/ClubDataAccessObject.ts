import type ClubDataAccessInterface from './ClubDataAccessInterface.js';
import type { Club } from '../../models/ClubModel.js';
import type { User } from '../../models/UserModel.js';
import type { Event } from '../../models/EventModel.js';
import type { CreateClubData, UpdateClubData } from './ClubInputData.js';
import prisma from '../../config/client.js';
import { handlePrismaError } from '../../utils/prismaErrors.js';

export default class ClubDataAccessObject implements ClubDataAccessInterface {
  async getClubById(clubId: string): Promise<Club | null> {
    try {
      const response = await prisma.club.findUnique({
        where: { id: clubId },
        select: {
          id: true,
          name: true,
          description: true,
          organizerId: true,
          registered: true,
        },
      });
      return response;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.getClubById');
      return null;
    }
  }

  async getClubsByIds(clubIds: string[]): Promise<Club[]> {
    try {
      const response: Club[] = await prisma.club.findMany({
        where: { id: { in: clubIds } },
        select: {
          id: true,
          name: true,
          description: true,
          organizerId: true,
          registered: true,
        },
      });
      return response;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.getClubsByIds');
      return [];
    }
  }

  async getAllClubs(): Promise<Club[]> {
    try {
      const response: Club[] = await prisma.club.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          organizerId: true,
          registered: true,
        },
      });
      return response;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.getAllClubs');
      return [];
    }
  }

  async createClub(data: CreateClubData): Promise<Club | null> {
    try {
      const club: Club = await prisma.club.create({
        data,
        select: {
          id: true,
          name: true,
          description: true,
          organizerId: true,
          registered: true,
        },
      });
      return club;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.createClub');
      return null;
    }
  }

  async updateClub(clubId: string, data: UpdateClubData): Promise<Club | null> {
    try {
      const club: Club = await prisma.club.update({
        where: { id: clubId },
        data: data,
        select: {
          id: true,
          name: true,
          description: true,
          organizerId: true,
          registered: true,
        },
      });
      return club;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.updateClub');
      return null;
    }
  }

  async deleteClub(clubId: string): Promise<Club | null> {
    try {
      const deletedClub = await prisma.club.delete({
        where: { id: clubId },
        select: {
          id: true,
          name: true,
          description: true,
          organizerId: true,
          registered: true,
        },
      });
      return deletedClub;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.deleteClub');
      return null;
    }
  }

  async getOrganizer(clubId: string): Promise<User | null> {
    try {
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
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.getOrganizer');
      return null;
    }
  }

  async updateOrganizer(
    clubId: string,
    organizerId: string,
  ): Promise<User | null> {
    try {
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
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.updateOrganizer');
      return null;
    }
  }

  async getClubFollowers(clubId: string): Promise<User[] | null> {
    try {
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
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.getClubFollowers');
      return null;
    }
  }

  async checkClubRegistered(clubId: string): Promise<boolean> {
    try {
      const response = await prisma.club.findUnique({
        where: { id: clubId },
        select: { registered: true },
      });
      return response ? response.registered : false;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.checkClubRegistered');
      return false;
    }
  }

  async listEvents(clubId: string): Promise<Event[] | null> {
    try {
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

      return response?.events || null;
    } catch (err) {
      handlePrismaError(err, 'ClubDataAccessObject.listEvents');
      return null;
    }
  }
}
