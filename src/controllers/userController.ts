import type UserDataAccessInterface from '../data/user/userDataAccessInterface.js';
import type { Club } from '../models/ClubModel.js';
import type { User } from '../models/UserModel.js';
import UserService from '../services/userService.js';
import type { Response, Request, NextFunction } from 'express';

export default class UserController {
  private userService: UserService;

  constructor(userDataAccessObject: UserDataAccessInterface) {
    this.userService = new UserService(userDataAccessObject);
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

  async addClubFollowing(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    if (!req.body.clubId) {
      return res.status(400).json({ error: 'ClubId cannot be null.' });
    }
    try {
      const club: Club | null = await this.userService.addClubFollowing(
        req.params.id,
        req.body.clubId,
      );
      if (!club) {
        return res.status(404).json({ error: 'User or club not found.' });
      }
      res.json(club);
    } catch (error) {
      next(error);
    }
  }

  async deleteClubFollowing(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    if (!req.body.clubId) {
      return res.status(400).json({ error: 'ClubId cannot be null.' });
    }
    try {
      const club: Club | null = await this.userService.deleteClubFollowing(
        req.params.id,
        req.body.clubId,
      );
      if (!club) {
        return res.status(404).json({ error: 'User or club not found.' });
      }
      res.json(club);
    } catch (error) {
      next(error);
    }
  }

  // TODO: idk how to check that this method actually worked?
  async addOrganizingClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id || req.body.clubId) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    const userId = req.params.id;
    const clubId = req.body.clubId;
    try {
      await this.userService.addOrganizingClub(userId, clubId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async deleteOrganizingClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id || !req.body.clubId) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    const userId = req.params.id;
    const clubId = req.body.clubId;
    try {
      const organizing = await this.userService.checkOrganizing(userId, clubId);
      if (!organizing) {
        return res.status(404).json({
          error: 'User is not organizing this club or user not found.',
        });
      }
      await this.userService.deleteOrganizingClub(userId, clubId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

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
