import type UserDataAccessInterface from './UserDataAccessInterface.js';
import type { User } from '../../models/UserModel.js';
import type { Club } from '../../models/ClubModel.js';
import type { CreateUserData, UpdateUserData } from './UserInputData.js';
import prisma from '../../config/client.js';
import { handlePrismaError } from '../../utils/prismaErrors.js';

export default class UserDataAccessObject implements UserDataAccessInterface {
  /**
   * Create new user.
   * @param user JSON object with user data
   * @returns the new user object
   */
  async createUser(userData: CreateUserData) {
    try {
      const newUser = await prisma.user.create({
        data: userData,
      });
      return newUser;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.createUser');
      return null;
    }
  }

  /**
   * Update the user with the given userId with the new data.
   * @param userId the id of user to be updated
   * @param newData the new updated data for user
   */
  async updateUser(userId: string, newData: UpdateUserData) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: newData,
      });
      return updatedUser;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.updateUser');
      return null;
    }
  }

  /**
   * Read all users
   * @returns all of the user objects in the database
   */
  async getAllUsers() {
    try {
      const users = await prisma.user.findMany({});
      return users;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getAllUsers');
      return [];
    }
  }

  /**
   * Return user array corresponding to userId array.
   * @param userIds the array of user ids
   */
  async getUsersById(userIds: string[]) {
    try {
      const users: User[] = await prisma.user.findMany({
        where: { id: { in: userIds } },
      });
      return users;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getUsersById');
      return [];
    }
  }

  /**
   * Read user by id.
   * @param userId the id of the user to return.
   * @returns the user object
   */
  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getUserById');
      return null;
    }
  }

  /**
   * Read user by email.
   * @param email the email of the user to return.
   * @returns the user object
   */
  async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      return user;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getUserByEmail');
      return null;
    }
  }

  /**
   * Read user by phone number.
   * @param phoneNum the phone number of the user to return.
   * @returns the user object
   */
  async getUserByPhone(phoneNum: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { phoneNumber: phoneNum },
      });
      return user;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getUserByPhone');
      return null;
    }
  }

  /**
   * Read user by username.
   * @param username the username of the user to return.
   * @returns the user object
   */
  async getUserByUsername(username: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      return user;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getUserByUsername');
      return null;
    }
  }

  /**
   * Read all clubs user is following.
   * @param userId the id of the user
   * @returns the club ids
   */
  async getFollowingClubs(userId: string) {
    try {
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
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getFollowingClubs');
      return [];
    }
  }

  /**
   * Read all of the clubs the given user is organizing.
   * @param userId the id of the user
   * @returns the club objects
   */
  async getOrganizingClubs(userId: string): Promise<Club[]> {
    try {
      const clubs = await prisma.club.findMany({
        where: { organizerId: userId },
      });
      return clubs;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.getOrganizingClubs');
      return [];
    }
  }

  async checkOrganizing(userId: string, clubId: string): Promise<boolean> {
    try {
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
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.checkOrganizing');
      return false;
    }
  }

  /**
   * Update the user's organizing clubs with the new club.
   * @param userId the id of the user to update organizing for
   * @param clubId the id of the new club user is organizing
   */
  async addOrganizingClub(userId: string, clubId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          organizedClubs: {
            connect: { id: clubId },
          },
        },
      });
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.addOrganizingClub');
    }
  }

  /**
   * Remove the club corresponding to given id from the user's organizing.
   * @param userId the user to remove club from
   * @param clubId the club to remove from user's organizing clubs
   */
  async deleteOrganizingClub(userId: string, clubId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          organizedClubs: {
            disconnect: { id: clubId },
          },
        },
      });
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.deleteOrganizingClub');
    }
  }

  async addClubFollowing(userId: string, clubId: string): Promise<Club | null> {
    try {
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
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.addClubFollowing');
      return null;
    }
  }

  /**
   * Delete the club associated with the given id from user's following ('unfollow' club).
   * @param userId the user from which to remove the club
   */
  async deleteClubFollowing(
    userId: string,
    clubId: string,
  ): Promise<Club | null> {
    try {
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
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.deleteClubFollowing');
      return null;
    }
  }

  /**
   * Delete the user associated with the given id.
   * @param userId the id of user to be deleted
   * @returns the deleted user object (mostly for debugging)
   */
  async deleteUser(userId: string): Promise<User | null> {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return deletedUser;
    } catch (err) {
      handlePrismaError(err, 'UserDataAccessObject.deleteUser');
      return null;
    }
  }
}
