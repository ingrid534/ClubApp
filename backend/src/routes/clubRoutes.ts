import { Router } from 'express';
import checkJwt from '../middlewares/checkJwt.js';
import ClubDataAccessObject from '../data/club/ClubDataAccessObject.js';
import ClubService from '../services/clubService.js';
import ClubController from '../controllers/clubController.js';

const clubRouter = Router();
const clubDataAccessObject = new ClubDataAccessObject();
const clubService = new ClubService(clubDataAccessObject);
const clubController = new ClubController(clubService);

// create club
clubRouter.post('/create', clubController.createClub);

// read all clubs
clubRouter.get('/', clubController.getAllClubs);

// read one club by id
clubRouter.get('/:id', clubController.getClubById);

// get the organizer for this club
clubRouter.get('/:id/organizer', clubController.getOrganizer);

// update the organizer for this club
clubRouter.put('/:id/organizer', clubController.updateOrganizer);

// update club
clubRouter.put('/:id', clubController.updateClub);

// delete club
clubRouter.delete('/:id', clubController.deleteClub);

// get all club followers
clubRouter.get('/:id/followers', clubController.getClubFollowing);

// check if club is registered
clubRouter.get('/:id/registered', clubController.checkClubRegistered);

// list all events for this club
clubRouter.get('/:id/events', clubController.listEvents);

export default clubRouter;
