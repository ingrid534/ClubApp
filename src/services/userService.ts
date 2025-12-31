import type { Club } from '../models/ClubModel.js';
import type { User } from '../models/UserModel.js';
import type {
  CreateUserData,
  UpdateUserData,
} from '../data/user/UserInputData.js';
import type UserDataAccessInterface from '../data/user/userDataAccessInterface.js';

export default class UserService {
  private userDao: UserDataAccessInterface;

  constructor(userDao: UserDataAccessInterface) {
    this.userDao = userDao;
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

  async createUser(userData: CreateUserData): Promise<User> {
    const user: User | null = await this.userDao.createUser(userData);
    if (!user) {
      throw new Error('Failed to create user.');
    }
    return user;
  }

  async updateUser(userId: string, userData: UpdateUserData): Promise<User> {
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

  async getFollowingClubs(userId: string): Promise<Club[]> {
    const clubs: Club[] = await this.userDao.getFollowingClubs(userId);
    return clubs;
  }

  async getOrganizingClubs(userId: string): Promise<Club[]> {
    const clubs: Club[] = await this.userDao.getOrganizingClubs(userId);
    return clubs;
  }

  async checkOrganizing(userId: string, clubId: string): Promise<boolean> {
    const res = await this.userDao.checkOrganizing(userId, clubId);
    return res;
  }

  async addOrganizingClub(userId: string, clubId: string): Promise<void> {
    await this.userDao.addOrganizingClub(userId, clubId);
  }

  async deleteOrganizingClub(userId: string, clubId: string): Promise<void> {
    await this.userDao.deleteOrganizingClub(userId, clubId);
  }

  async addClubFollowing(userId: string, clubId: string): Promise<Club> {
    const club = this.userDao.addClubFollowing(userId, clubId);
    return club;
  }

  async deleteClubFollowing(userId: string, clubId: string): Promise<Club> {
    const club = this.userDao.deleteClubFollowing(userId, clubId);
    return club;
  }
}
