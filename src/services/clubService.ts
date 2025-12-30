import type { Club } from '../model/ClubModel.js';
import type { User } from '../model/UserModel.js';
import type { Event } from '../model/EventModel.js';
import type { ClubDataAccessInterface } from '../data/club/ClubDataAccessInterface.js';

class ClubService {
  private clubDao: ClubDataAccessInterface;
  constructor(clubDao: ClubDataAccessInterface) {
    this.clubDao = clubDao;
  }

  async getAllClubs(): Promise<Club[]> {
    const clubs: Club[] = await this.clubDao.getAllClubs();
    return clubs;
  }

  async getClubById(clubId: string): Promise<Club> {
    const club: Club | null = await this.clubDao.getClubById(clubId);
    if (!club) {
      throw new Error('Club not found');
    }
    return club;
  }

  async getClubsByIds(clubIds: string[]): Promise<Club[]> {
    const clubs: Club[] = await this.clubDao.getClubsByIds(clubIds);
    if (!clubs) {
      throw new Error('No clubs found for the given IDs');
    }
    return clubs;
  }

  async createClub(clubData: Partial<Club>): Promise<Club> {
    const club: Club | null = await this.clubDao.createClub(clubData);
    if (!club) {
      throw new Error('Failed to create club');
    }
    return club;
  }

  async updateClub(clubId: string, clubData: Partial<Club>): Promise<Club> {
    const club: Club | null = await this.clubDao.updateClub(clubId, clubData);
    if (!club) {
      throw new Error('Failed to update club');
    }
    return club;
  }

  async deleteClub(clubId: string): Promise<Club> {
    const club: Club | null = await this.clubDao.deleteClub(clubId);
    if (!club) {
      throw new Error('Failed to delete club');
    }
    return club;
  }

  async getOrganizer(clubId: string): Promise<User> {
    const user: User | null = await this.clubDao.getOrganizer(clubId);
    if (!user) {
      throw new Error('Organizer not found');
    }
    return user;
  }

  async updateOrganizer(clubId: string, organizerId: string): Promise<User> {
    const user: User | null = await this.clubDao.updateOrganizer(
      clubId,
      organizerId,
    );
    if (!user) {
      throw new Error('Failed to update organizer');
    }
    return user;
  }

  async getClubFollowing(clubId: string): Promise<User[]> {
    const users: User[] | null = await this.clubDao.getClubFollowers(clubId);
    return users;
  }

  async checkClubRegistered(clubId: string): Promise<boolean> {
    const isRegistered: boolean =
      await this.clubDao.checkClubRegistered(clubId);
    return isRegistered;
  }

  async listEvents(clubId: string): Promise<Event[]> {
    const events: Event[] = await this.clubDao.listEvents(clubId);
    return events;
  }
}

export default ClubService;
