import type { Request, Response, NextFunction } from 'express';
import type ClubDataAccessInterface from '../data/club/clubDataAccessInterface.js';
import type { Club } from '../models/ClubModel.js';
import type { Event } from '../models/EventModel.js';
import type { User } from '../models/UserModel.js';
import ClubService from '../services/clubService.js';

export default class ClubController {
  private clubService: ClubService;

  constructor(clubDataAccessObject: ClubDataAccessInterface) {
    this.clubService = new ClubService(clubDataAccessObject);
  }

  async getAllClubs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const clubs = await this.clubService.getAllClubs();
      res.status(200).json(clubs);
    } catch (error) {
      next(error);
    }
  }

  async createClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Request body cannot be null.' });
      }
      const { name, organizerId, registered } = req.body;
      if (!name || !organizerId || registered === undefined) {
        return res.status(400).json({ error: 'Missing required club fields.' });
      }
      const clubInput: Partial<Club> = {
        name,
        organizerId,
        registered,
      };

      const club: Club = await this.clubService.createClub(clubInput);
      res.status(201).json(club);
    } catch (error) {
      next(error);
    }
  }

  async getClubById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const club: Club | null = await this.clubService.getClubById(
        req.params.id,
      );
      if (!club) {
        return res.status(404).json({ error: 'Club not found.' });
      }
      return res.json(club);
    } catch (error) {
      next(error);
    }
  }

  async getClubFollowing(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const users: User[] = await this.clubService.getClubFollowing(
        req.params.id,
      );
      if (!users) {
        return res.status(404).json({ error: 'Club not found.' });
      }
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getOrganizer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const user: User | null = await this.clubService.getOrganizer(
        req.params.id,
      );
      if (!user) {
        return res.status(404).json({ error: 'Club or organizer not found.' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateOrganizer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    if (!req.body.organizerId) {
      return res.status(400).json({ error: 'OrganizerId cannot be null.' });
    }
    try {
      const user: User | null = await this.clubService.updateOrganizer(
        req.params.id,
        req.body.organizerId,
      );
      if (!user) {
        return res.status(404).json({ error: 'Club or organizer not found.' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const id = req.params.id;
      const updatedClub: Partial<Club> = {};
      if (req.body.name) updatedClub.name = req.body.name;
      if (req.body.organizerId) updatedClub.organizerId = req.body.organizerId;
      if (req.body.registered) updatedClub.registered = req.body.registered;

      const club: Club | null = await this.clubService.updateClub(
        id,
        updatedClub,
      );
      if (!club) {
        return res.status(404).json({ error: 'Club not found.' });
      }
      res.status(200).json(club);
    } catch (error) {
      next(error);
    }
  }

  async deleteClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const club: Club | null = await this.clubService.deleteClub(id);
      if (!club) {
        return res.status(404).json({ error: 'Club not found.' });
      }
      res.status(200).json(club);
    } catch (error) {
      next(error);
    }
  }

  async checkClubRegistered(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const club: Club | null = await this.clubService.getClubById(id);
      if (!club) {
        return res.status(404).json({ error: 'Club not found.' });
      }
      res.status(200).json({ registered: club.registered });
    } catch (error) {
      next(error);
    }
  }

  async listEvents(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const events: Event[] = await this.clubService.listEvents(id);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }
}
