import type { ClubDataAccessInterface } from '../data/club/ClubDataAccessInterface.js';
import type { CreateClubInputData } from '../data/club/ClubInputData.js';
import type { Club } from '../model/ClubModel.js';

export class ClubController {
  private clubDao: ClubDataAccessInterface;

  constructor(clubDao: ClubDataAccessInterface) {
    this.clubDao = clubDao;
  }

  async createClub(clubData: CreateClubInputData) {}

  async getAllClubs() {}

  async getClubById(clubId: string): Promise<Club> {}

  // not implementing yet - need to implement follow clubs for user (after user auth)
  async getClubFollowing() {}
}
