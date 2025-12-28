import type { UserDataAccessInterface } from '../data/user/UserDataAccessInterface.js';
import type { CreateUserData } from '../data/user/UserInputData.js';
export class UserController {
  private userDao: UserDataAccessInterface;

  constructor(userDao: UserDataAccessInterface) {
    this.userDao = userDao;
  }

  async createUser(userData: CreateUserData) {
    // You may want to validate userData here
    return await this.userDao.createUser(userData);
  }

  getAllUsers() {}
}
