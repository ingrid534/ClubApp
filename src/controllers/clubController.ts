import type { ClubDataAccessInterface } from '../data/club/ClubDataAccessInterface.js';
import type {
  CreateClubInputData,
  UpdateClubInputData,
} from '../data/club/ClubInputData.js';
import type { Club } from '../model/ClubModel.js';
import type { User } from '../model/UserModel.js';

export class ClubController {
  private clubDao: ClubDataAccessInterface;

  constructor(clubDao: ClubDataAccessInterface) {
    this.clubDao = clubDao;
  }

  async createClub(clubData: CreateClubInputData) {}

  async getAllClubs() {}

  async getClubById(clubId: string): Promise<Club | null> {}

  async getClubFollowing(clubId: string): Promise<User[]> {}

  async getClubOrganizer(clubId: string): Promise<User | null> {}

  async updateClub(
    clubId: string,
    clubData: UpdateClubInputData,
  ): Promise<Club | null> {}

  async deleteClub(clubId: string): Promise<Club | null> {}
}
