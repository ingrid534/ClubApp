import type { User } from '../../models/UserModel.js';
import type { Club } from '../../models/ClubModel.js';
import type { CreateUserData, UpdateUserData } from './UserInputData.js';

export default interface UserDataAccessInterface {
  /**
   * Create new user.
   * @param user JSON object with user data
   * @returns the new user object
   */
  createUser(data: CreateUserData): Promise<User | null>;

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
   * Check whether the given user is organizing the given club.
   * @param userId the id of the user to check
   * @param clubId the id of the club to check
   */
  checkOrganizing(userId: string, clubId: string): Promise<boolean>;

  /**
   * Update the user with the given userId with the new data.
   * @param userId the id of user to be updated
   * @param newData the new updated data for user
   */
  updateUser(userId: string, data: UpdateUserData): Promise<User>;

  /**
   * Update the user's organizing clubs with the new club.
   * @param userId the id of the user to update organizing for
   * @param clubId the id of the new club user is organizing
   */
  addOrganizingClub(userId: string, clubId: string): Promise<void>;

  /**
   * Remove the club corresponding to given id from the user's organizing.
   * @param userId the user to remove club from
   * @param clubId the club to remove from user's organizing clubs
   */
  deleteOrganizingClub(userId: string, clubId: string): Promise<void>;

  /**
   * Add the club associated with the given id to user's following
   * @param userId the user to which to add club
   * @param clubId the club to add to following
   */
  addClubFollowing(userId: string, clubId: string): Promise<Club>;

  /**
   * Delete the club associated with the given id from user's following ('unfollow' club).
   * @param userId the user from which to remove the club
   * @param clubId the club to remove from following
   */
  deleteClubFollowing(userId: string, clubId: string): Promise<Club>;

  /**
   * Delete the user associated with the given id.
   * @param userId the id of user to be deleted
   */
  deleteUser(userId: string): Promise<User | null>;
}
