import type { Request, Response } from 'express';
import { Router } from 'express';
import { ClubDataAccessObject } from '../data/club/ClubDataAccessObject.js';
import { ClubController } from '../controllers/clubController.js';
import prisma from '../data/client.js';

const router = Router();
const clubDao = new ClubDataAccessObject(prisma);
const controller = new ClubController(clubDao);

// create club
router.post('/', async (req: Request, res: Response) => {
  try {
    const club = await controller.createClub(req.body);
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// read all clubs
router.get('/', async (req: Request, res: Response) => {
  try {
    const clubs = await controller.getAllClubs();
    res.status(201).json(clubs);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// read one club by id
// need to use try catch for async functions
router.get('/:id', async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Id cannot be null.' });
  }
  try {
    const club = await controller.getClubById(req.params.id);
    if (!club) {
      res.status(404).send('Club not found.');
    } else {
      res.json(club);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
