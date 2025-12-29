import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { ClubDataAccessObject } from '../data/club/ClubDataAccessObject.js';
import { ClubController } from '../controllers/clubController.js';
import prisma from '../data/client.js';
import type { UpdateClubInputData } from '../data/club/ClubInputData.js';

const router = Router();
const clubDao = new ClubDataAccessObject(prisma);
const controller = new ClubController(clubDao);

// create club
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const club = await controller.createClub(req.body);
    res.status(201).json(club);
  } catch (error) {
    next(error);
  }
});

// read all clubs
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubs = await controller.getAllClubs();
    res.status(200).json(clubs);
  } catch (error) {
    next(error);
  }
});

// read one club by id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Id cannot be null.' });
  }
  try {
    const club = await controller.getClubById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: 'Club not found.' });
    }
    res.json(club);
  } catch (error) {
    next(error);
  }
});

// get all club followers
router.get(
  '/:id/followers',
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const users = await controller.getClubFollowing(req.params.id);
      if (!users) {
        return res.status(404).json({ error: 'Club not found.' });
      }
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
);

// get the organizer for this club
router.get(
  '/:id/organizer',
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const user = await controller.getClubOrganizer(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Club or organizer not found.' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

// update club
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Id cannot be null.' });
  }
  try {
    const updatedClub: UpdateClubInputData = {};
    if (req.body.name) updatedClub.name = req.body.name;
    if (req.body.organizerId) updatedClub.organizerId = req.body.organizerId;
    if (req.body.registered) updatedClub.registered = req.body.registered;

    const club = await controller.updateClub(req.params.id, updatedClub);
    if (!club) {
      return res.status(404).json({ error: 'Club not found.' });
    }
    res.status(200).json(club);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Id cannot be null.' });
    }
    try {
      const deletedClub = await controller.deleteClub(req.params.id);
      if (!deletedClub) {
        return res.status(404).json({ error: 'Club not found.' });
      }
      res.status(200).json(deletedClub);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
