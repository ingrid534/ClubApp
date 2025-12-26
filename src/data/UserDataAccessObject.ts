import type { Prisma, PrismaClient } from '../generated/prisma/client.js';
import type {
  UserDataAccessInterface,
  UserInputData,
  UserUpdateData} from './UserDataAccessInterface.js';
import type { User } from '../model/UserModel.js';
import type { Club } from '../model/ClubModel.js';

export class UserDataAccessObject implements UserDataAccessInterface {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Create new user.
   * @param user JSON object with user data
   * @returns the new user object
   */
  async createUser(user: UserInputData) {
    const newUser = await this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        username: user.username,
        passwordHash: user.passwordHash,
      },
    });
    return newUser;
  }

  /**
   * Read all users
   * @returns all of the user objects in the database
   */
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      where: {},
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phoneNumber: true,
      },
    });
    return users;
  }
  // STOPPED HERE -----------------------------

  /**
   * Return user array corresponding to userId array.
   * @param userIds the array of user ids
   */
  async getUsersById(userIds: string[]) {
    const users: User[] = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });
    return users;
  }

  /**
   * Read user by id.
   * @param userId the id of the user to return.
   * @returns the user object
   */
  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });
    return user;
  }

  /**
   * Read user by email.
   * @param email the email of the user to return.
   * @returns the user object
   */
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });
    return user;
  }

  /**
   * Read user by phone number.
   * @param phoneNum the phone number of the user to return.
   * @returns the user object
   */
  async getUserByPhone(phoneNum: string) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: phoneNum },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });
    return user;
  }

  /**
   * Read user by username.
   * @param username the username of the user to return.
   * @returns the user object
   */
  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });
    return user;
  }

  /**
   * Read all clubs user is following.
   * @param userId the id of the user
   * @returns the club ids
   */
  async getFollowingClubs(userId: string) {
    const clubs = await this.prisma.clubFollowing.findMany({
      where: { userId: userId },
      select: {
        club: {
          select: {
            id: true,
            name: true,
            organizerId: true,
            registered: true,
          },
        },
      },
    });
    return clubs.map((clubFollowing) => clubFollowing.club);
  }

  /**
   * NOT SURE IF THIS METHOD SHOULD BE HERE <----------
   * Read all of the clubs the given user is organizing.
   * @param userId the id of the user
   * @returns the club objects
   */
  async getOrganizingClubs(userId: string) {
    const clubs = await this.prisma.club.findMany({
      where: {
        organizerId: userId,
      },
    });
    return clubs;
  }

  /**
   * Update the user with the given userId with the new data.
   * @param userId the id of user to be updated
   * @param newData the new updated data for user
   * @returns the updated user object (mostly for debugging)
   */
  async updateUser(userId: string, newData: Prisma.UserUpdateInput) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: newData,
    });
    return updatedUser;
  }

  /**
   * Delete the user associated with the given id.
   * @param userId the id of user to be deleted
   * @returns the deleted user object (mostly for debugging)
   */
  async deleteUser(userId: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  }
}
