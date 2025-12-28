import type { Club } from '../../model/ClubModel.js';
import type { User } from '../../model/UserModel.js';
import type { Event } from '../../model/EventModel.js';
import type {
  CreateClubInputData,
  UpdateClubInputData,
} from './ClubInputData.js';

export interface ClubDataAccessInterface {
  /**
   * Get club given its id.
   * @Return the club object associated with the given id.
   * @param clubId the ID of the club to be retrieved.
   */
  getClubById(clubId: string): Promise<Club | null>;

  /**
   * Get many clubs given their ids.
   * @Return an array of club objects associated with the given ids.
   * @param clubIds
   */
  getClubsByIds(clubIds: string[]): Promise<Club[]>;

  /**
   * Get all clubs
   * @returns an array of all club objects
   */
  getAllClubs(): Promise<Club[]>;

  /**
   * Create a new club object with the given data.
   * @param data the club data to create
   */
  createClub(data: CreateClubInputData): Promise<Club | null>;

  /**
   * Update the club object with the given data.
   * @Return the updated club object after applying the given data.
   * @param data the updated club data
   */
  updateClub(clubId: string, data: UpdateClubInputData): Promise<Club | null>;

  /**
   * Delete the club object associated with the given id.
   * @param clubId the ID of the club being deleted
   */
  deleteClub(clubId: string): Promise<void>;

  /**
   * Get the organizer of the given club.
   * @Return the organizer object of the given club.
   * @param clubId club id
   */
  getOrganizer(clubId: string): Promise<User | null>;

  /**
   * Update the organizer of the given club.
   * @Return the organizer object of the given club.
   * @param clubId club id
   */
  updateOrganizer(clubId: string, organizerId: string): Promise<User | null>;

  /**
   * Get the followers of the given club.
   * @Return the list of user objects that follow the given club.
   * @param clubId club id
   */
  getClubFollowers(clubId: string): Promise<User[]>;

  /**
   * Return whether this club is registered.
   * @param clubId club (by id) to check registration for
   */
  checkClubRegistered(clubId: string): Promise<boolean>;

  /**
   * list events by club id
   *
   * @param clubId club id
   */
  listEvents(clubId: string): Promise<Event[]>;
}
