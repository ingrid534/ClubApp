import type { Prisma, PrismaClient } from '../generated/prisma/client.js';

export class UserDataAccessObject {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Create new user.
   * @param user JSON object with user data
   * @returns the new user object
   */
  async createUser(user: Prisma.UserCreateInput) {
    const newUser = await this.prisma.user.create({ data: user });
    return newUser;
  }

  /**
   * Read all users
   * @returns all of the user objects in the database
   */
  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  /**
   * Return user array corresponding to userId array.
   * @param userIds the array of user ids
   */
  async getUserArray(userIds: string[]) {
    const users = this.prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
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
      where: {
        id: userId,
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
      where: {
        email: email,
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
      where: {
        phoneNumber: phoneNum,
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
      where: {
        username: username,
      },
    });
    return user;
  }

  /**
   * Read all clubs user is following.
   * @param userId the id of the user
   * @returns the club ids
   */
  async getFollowingClubsForUser(userId: string) {
    const clubs = await this.prisma.clubFollowing.findMany({
      where: {
        userId: userId,
      },
    });
    return clubs.map((clubFollowing) => clubFollowing.clubId);
  }

  /**
   * NOT SURE IF THIS METHOD SHOULD BE HERE <----------
   * Read all of the clubs the given user is organizing.
   * @param userId the id of the user
   * @returns the club objects
   */
  async getOrganizedClubsForUser(userId: string) {
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
