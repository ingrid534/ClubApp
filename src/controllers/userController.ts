import type { UserDataAccessInterface } from '../data/user/UserDataAccessInterface.js';
import type { Club } from '../model/ClubModel.js';
import type { User } from '../model/UserModel.js';
import UserService from '../services/userService.js';
import type { Response, Request, NextFunction } from 'express';

export class UserController {
  private userService: UserService;

  constructor(userDataAccessObject: UserDataAccessInterface) {
    this.userService = new UserService(userDataAccessObject);
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Request body cannot be null. ' });
      }
      const { username, firstName, lastName, email, phoneNumber } = req.body;
      if (!username || !firstName || !lastName || !email || !phoneNumber) {
        return res.status(400).json({ error: 'Missing required user fields.' });
      }
      const userInput: Partial<User> = {
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
      };

      const user: User = await this.userService.createUser(userInput);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null. ' });
    }
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getFollowingClubs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const clubs: Club[] = await this.userService.getFollowingClubs(
        req.params.id,
      );
      if (clubs == null) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(clubs);
    } catch (error) {
      next(error);
    }
  }

  async getOrganizingClubs(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const clubs: Club[] = await this.userService.getOrganizingClubs(
        req.params.id,
      );
      if (clubs == null) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(clubs);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const id = req.params.id;
      const updatedUser: Partial<User> = {};
      if (req.body.username) updatedUser.username = req.body.username;
      if (req.body.firstName) updatedUser.firstName = req.body.firstName;
      if (req.body.lastName) updatedUser.lastName = req.body.lastName;
      if (req.body.email) updatedUser.email = req.body.email;
      if (req.body.phoneNumber) updatedUser.phoneNumber = req.body.phoneNumber;

      const user: User | null = await this.userService.updateUser(
        id,
        updatedUser,
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async addClubFollowing() {}

  async deleteClubFollowing() {}

  async addOrganizingClub() {}

  async deleteOrganizingClub() {}

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const user: User | null = await this.userService.deleteUser(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
