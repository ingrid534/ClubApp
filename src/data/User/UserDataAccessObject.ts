import type UserDataAccessInterface from './userDataAccessInterface.js';
import type { User } from '../../models/UserModel.js';
import type { Club } from '../../models/ClubModel.js';
import type { CreateUserData, UpdateUserData } from './UserInputData.js';
import prisma from '../../config/client.js';

export default class UserDataAccessObject implements UserDataAccessInterface {
  /**
   * Create new user.
   * @param user JSON object with user data
   * @returns the new user object
   */
  async createUser(userData: CreateUserData) {
    const newUser = await prisma.user.create({
      data: userData,
    });
    return newUser;
  }

  /**
   * Update the user with the given userId with the new data.
   * @param userId the id of user to be updated
   * @param newData the new updated data for user
   */
  async updateUser(userId: string, newData: UpdateUserData) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: newData,
    });
    return updatedUser;
  }

  /**
   * Read all users
   * @returns all of the user objects in the database
   */
  async getAllUsers() {
    const users = await prisma.user.findMany({});
    return users;
  }

  /**
   * Return user array corresponding to userId array.
   * @param userIds the array of user ids
   */
  async getUsersById(userIds: string[]) {
    const users: User[] = await prisma.user.findMany({
      where: { id: { in: userIds } },
    });
    return users;
  }

  /**
   * Read user by id.
   * @param userId the id of the user to return.
   * @returns the user object
   */
  async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }

  /**
   * Read user by email.
   * @param email the email of the user to return.
   * @returns the user object
   */
  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }

  /**
   * Read user by phone number.
   * @param phoneNum the phone number of the user to return.
   * @returns the user object
   */
  async getUserByPhone(phoneNum: string) {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phoneNum },
    });
    return user;
  }

  /**
   * Read user by username.
   * @param username the username of the user to return.
   * @returns the user object
   */
  async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    return user;
  }

  /**
   * Read all clubs user is following.
   * @param userId the id of the user
   * @returns the club ids
   */
  async getFollowingClubs(userId: string) {
    const clubs = await prisma.clubFollowing.findMany({
      where: { userId: userId },
      select: {
        club: {
          select: {
            id: true,
            name: true,
            description: true,
            organizerId: true,
            registered: true,
          },
        },
      },
    });
    return clubs.map((clubFollowing) => clubFollowing.club);
  }

  /**
   * Read all of the clubs the given user is organizing.
   * @param userId the id of the user
   * @returns the club objects
   */
  async getOrganizingClubs(userId: string): Promise<Club[]> {
    const clubs = await prisma.club.findMany({
      where: { organizerId: userId },
    });
    return clubs;
  }

  async checkOrganizing(userId: string, clubId: string): Promise<boolean> {
    const res = await prisma.user.findFirst({
      where: {
        id: userId,
        organizedClubs: {
          some: {
            id: clubId,
          },
        },
      },
    });
    return !(res == null);
  }

  /**
   * Update the user's organizing clubs with the new club.
   * @param userId the id of the user to update organizing for
   * @param clubId the id of the new club user is organizing
   */
  async addOrganizingClub(userId: string, clubId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        organizedClubs: {
          connect: { id: clubId },
        },
      },
    });
  }

  /**
   * Remove the club corresponding to given id from the user's organizing.
   * @param userId the user to remove club from
   * @param clubId the club to remove from user's organizing clubs
   */
  async deleteOrganizingClub(userId: string, clubId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        organizedClubs: {
          disconnect: { id: clubId },
        },
      },
    });
  }

  async addClubFollowing(userId: string, clubId: string): Promise<Club> {
    const clubFollowing = await prisma.clubFollowing.create({
      data: {
        userId: userId,
        clubId: clubId,
      },
      select: {
        club: true,
      },
    });
    return clubFollowing.club;
  }

  /**
   * Delete the club associated with the given id from user's following ('unfollow' club).
   * @param userId the user from which to remove the club
   */
  async deleteClubFollowing(userId: string, clubId: string): Promise<Club> {
    const deletedFollowing = await prisma.clubFollowing.delete({
      where: {
        userId_clubId: {
          userId: userId,
          clubId: clubId,
        },
      },
      select: {
        club: true,
      },
    });
    return deletedFollowing.club;
  }

  /**
   * Delete the user associated with the given id.
   * @param userId the id of user to be deleted
   * @returns the deleted user object (mostly for debugging)
   */
  async deleteUser(userId: string): Promise<User | null> {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  }
}
