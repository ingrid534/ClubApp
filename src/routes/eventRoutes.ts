import { Router } from 'express';
import checkJwt from '../middlewares/checkJwt.js';
import EventDataAccessObject from '../data/event/eventDataAccessObject.js';
import EventService from '../services/eventService.js';
import EventController from '../controllers/eventController.js';

const eventRouter = Router();
const eventDataAccessObject = new EventDataAccessObject();
const eventService = new EventService(eventDataAccessObject);
const eventController = new EventController(eventService);

eventRouter.get('/', eventController.getEvents);

eventRouter.get('/:id', eventController.getEventById);

eventRouter.post('/', checkJwt, eventController.createEvent);

eventRouter.put('/:id', checkJwt, eventController.updateEvent);

eventRouter.delete('/:id', checkJwt, eventController.deleteEvent);

export default eventRouter;
