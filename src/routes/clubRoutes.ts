import { Router } from 'express';
import { ClubDataAccessObject } from '../data/club/ClubDataAccessObject.js';
import { ClubController } from '../controllers/clubController.js';
import prisma from '../config/client.js';

const router = Router();
const clubDataAccessObject = new ClubDataAccessObject(prisma);
const clubController = new ClubController(clubDataAccessObject);

// create club
router.post('/clubs/create', clubController.createClub);

// read all clubs
router.get('/clubs/', clubController.getAllClubs);

// read one club by id
router.get('/clubs/:id', clubController.getClubById);

// get the organizer for this club
router.get('/clubs/:id/organizer', clubController.getOrganizer);

// update the organizer for this club
router.put('/clubs/:id/organizer', clubController.updateOrganizer);

// update club
router.put('/clubs/:id', clubController.updateClub);

// delete club
router.delete('/clubs/:id', clubController.deleteClub);

// get all club followers
router.get('/clubs/:id/followers', clubController.getClubFollowing);

// check if club is registered
router.get('/clubs/:id/registered', clubController.checkClubRegistered);

// list all events for this club
router.get('/clubs/:id/events', clubController.listEvents);

export default router;
