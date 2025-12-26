import type { User } from '../model/UserModel.js';
import type { Club } from '../model/ClubModel.js';

export interface UserInputData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  passwordHash: string;
}

export interface UserUpdateData {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  passwordHash?: string;
}

export interface UserDataAccessInterface {
  /**
   * Create new user.
   * @param user JSON object with user data
   * @returns the new user object
   */
  createUser(data: UserInputData): Promise<User | null>;

  /**
   * Read all users
   */
  getAllUsers(): Promise<User[]>;

  /**
   * Read all the users corresponding to the given userIds.
   * @param userIds the array of user ids
   */
  getUsersById(userIds: string[]): Promise<User[]>;

  /**
   * Read club given its id.
   * @param userId the ID of the user to be retrieved.
   */
  getUserById(userId: string): Promise<User | null>;

  /**
   * Read user by email.
   * @param email the email of the user to return.
   */
  getUserByEmail(email: string): Promise<User | null>;

  /**
   * Read user by phone number.
   * @param phoneNum the phone number of the user to return.
   */
  getUserByPhone(phoneNum: string): Promise<User | null>;

  /**
   * Read user by username.
   * @param username the username of the user to return.
   */
  getUserByUsername(username: string): Promise<User | null>;

  /**
   * Read all clubs user is following.
   * @param userId the id of the user
   */
  getFollowingClubs(userId: string): Promise<Club[]>;

  /**
   * Read all of the clubs the given user is organizing.
   * @param userId the id of the user
   */
  getOrganizingClubs(userId: string): Promise<Club[]>;

  /**
   * Check whether the given user is an organizer for the given club.
   * @param userId the user to verify
   * @param clubId the club in which to verify organizer status
   */
  isOrganizer(userId: string, clubId: string): boolean;

  /**
   * Update the user with the given userId with the new data.
   * @param userId the id of user to be updated
   * @param newData the new updated data for user
   */
  updateUser(userId: string, data: UserUpdateData): Promise<User>;

  /**
   * Update the user's organizing clubs with the new club.
   * @param userId the id of the user to update organizing for
   * @param clubId the id of the new club user is organizing
   */
  updateOrganizingClubs(userId: string, clubId: string): void;

  /**
   * Delete the club associated with the given id from user's following ('unfollow' club).
   * @param userId the user from which to remove the club
   */
  deleteClubFollowing(userId: string, clubId: string): void;

  /**
   * Delete the user associated with the given id.
   * @param userId the id of user to be deleted
   */
  deleteUser(userId: string): void;
}
