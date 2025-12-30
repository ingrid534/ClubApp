import { Router } from 'express';
import ClubDataAccessObject from '../data/club/ClubDataAccessObject.js';
import ClubController from '../controllers/clubController.js';

const router = Router();
const clubDataAccessObject = new ClubDataAccessObject();
const clubController = new ClubController(clubDataAccessObject);

// create club
router.post('/create', clubController.createClub);

// read all clubs
router.get('/', clubController.getAllClubs);

// read one club by id
router.get('/:id', clubController.getClubById);

// get the organizer for this club
router.get('/:id/organizer', clubController.getOrganizer);

// update the organizer for this club
router.put('/:id/organizer', clubController.updateOrganizer);

// update club
router.put('/:id', clubController.updateClub);

// delete club
router.delete('/:id', clubController.deleteClub);

// get all club followers
router.get('/:id/followers', clubController.getClubFollowing);

// check if club is registered
router.get('/:id/registered', clubController.checkClubRegistered);

// list all events for this club
router.get('/:id/events', clubController.listEvents);

export default router;
