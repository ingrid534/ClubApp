import type { UserDataAccessInterface } from '../data/user/UserDataAccessInterface.js';
import type { Club } from '../model/ClubModel.js';
import type { User } from '../model/UserModel.js';

class UserService {
  private userDao: UserDataAccessInterface;

  constructor(userDao: UserDataAccessInterface) {
    this.userDao = userDao;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user: User | null = await this.userDao.createUser(userData);
    if (!user) {
      throw new Error('Failed to create user.');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userDao.getAllUsers();
    return users;
  }

  async getUserById(userId: string): Promise<User> {
    const user: User | null = await this.userDao.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getFollowingClubs(userId: string): Promise<Club[]> {
    const clubs: Club[] | null = await this.userDao.getFollowingClubs(userId);
    return clubs;
  }

  async getOrganizingClubs(userId: string): Promise<Club[]> {
    const clubs: Club[] | null = await this.userDao.getOrganizingClubs(userId);
    return clubs;
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const user: User | null = await this.userDao.updateUser(userId, userData);
    if (!user) {
      throw new Error('Failed to update user.');
    }
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const user: User | null = await this.userDao.deleteUser(userId);
    if (!user) {
      throw new Error('Failed to delete user.');
    }
    return user;
  }
}

export default UserService;
