import type { Club } from '../model/ClubModel.js';
import type { User } from '../model/User.js';

export interface ClubDataAccessInterface {
  /**
   * Return the club object associated with the given id.
   * @param clubId the ID of the club to be retrieved.
   */
  getClub(clubId: string): Promise<Club | null>;

  /**
   * Return an aray of club objects associated with the given ids.
   * @param clubIds
   */
  getManyClubs(clubIds: string[]): Promise<Club[]>;

  /**
   * Return the organizer object of the given club.
   * @param clubId club id
   */
  getOrganizer(clubId: string): Promise<User | null>;

  /**
   * Return the list of user objects that follow the given club.
   * @param clubId club id
   */
  getClubFollowers(clubId: string): Promise<User[]>;

  /**
   * Return whether this club is registered.
   * @param clubId club (by id) to check registration for
   */
  checkClubRegistered(clubId: string): Promise<boolean>;
}
