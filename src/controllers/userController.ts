import type { UserDataAccessInterface } from '../data/user/UserDataAccessInterface.js';
import { PrismaClient } from '../generated/prisma/client.js';
export class UserController {
  private userDao: UserDataAccessInterface;

  constructor(userDao: UserDataAccessInterface) {
    this.userDao = userDao;
  }

  async createUser(userData: any) {
    // You may want to validate userData here
    return await this.userDao.createUser(userData);
  }

  getAllUsers() {}
}
