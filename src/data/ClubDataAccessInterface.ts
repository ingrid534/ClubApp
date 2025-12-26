import type { Club } from '../model/ClubModel.js';
import type { User } from '../model/User.js';

export interface ClubDataAccessInterface {
  /**
   * Get club given its id.
   * @Return the club object associated with the given id.
   * @param clubId the ID of the club to be retrieved.
   */
  getClub(clubId: string): Promise<Club | null>;

  /**
   * Create a new club object with the given data.
   * @param data the club data to create
   */
  createClub(userId: string, data: Club): Promise<Club | null>;

  /**
   * Update the club object with the given data.
   * @Return the updated club object after applying the given data.
   * @param clubId the club id
   * @param data the updated club data
   */
  updateClub(clubId: string, data: Club): Promise<Club>;

  /**
   * Delete the club object associated with the given id.
   * @param clubId the ID of the club being deleted
   */
  deleteClub(clubId: string): void;

  /**
   * Get many clubs given their ids.
   * @Return an aray of club objects associated with the given ids.
   * @param clubIds
   */
  getManyClubs(clubIds: string[]): Promise<Club[]>;

  /**
   * Get the organizer of the given club.
   * @Return the organizer object of the given club.
   * @param clubId club id
   */
  getOrganizer(clubId: string): Promise<User | null>;

  /**
   * Update the organizer of the given club to the given user id.
   * @Return the updated organizer object after updating the organizer to the given user id.
   * @param clubId club id
   * @param userId user id
   */
  updateOrganizer(clubId: string, userId: string): Promise<User | null>;

  /**
   * Get the followers of the given club.
   * @Return the list of user objects that follow the given club.
   * @param clubId club id
   */
  getClubFollowers(clubId: string): Promise<User[]>;

  /**
   * Delete a followers of the given club.
   * @param clubId club id
   * @param userId user id
   */
  deleteClubFollowers(clubId: string, userId: string): void;

  /**
   * Return whether this club is registered.
   * @param clubId club (by id) to check registration for
   */
  checkClubRegistered(clubId: string): Promise<boolean>;
}
