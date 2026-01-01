import type { Request, Response, NextFunction } from 'express';
import type {
  CreateEventData,
  UpdateEventData,
} from '../data/event/EventInputData.js';
import EventService from '../services/eventService.js';

export default class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async getEvents(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const events = await this.eventService.getAllEvents();
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }

  async getEventById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const eventId = req.params.id;
      if (!eventId) {
        return res.status(400).json({ message: 'Event ID is required' });
      }

      const event = await this.eventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }

  async createEvent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const eventData: CreateEventData = req.body;
      const newEvent = await this.eventService.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (err) {
      next(err);
    }
  }

  async updateEvent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const eventId = req.params.id;
      const eventData: UpdateEventData = req.body;

      if (!eventId) {
        return res.status(400).json({ message: 'Event ID is required' });
      }

      const updatedEvent = await this.eventService.updateEvent(
        eventId,
        eventData,
      );

      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json(updatedEvent);
    } catch (err) {
      next(err);
    }
  }

  async deleteEvent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const eventId = req.params.id;

      if (!eventId) {
        return res.status(400).json({ message: 'Event ID is required' });
      }

      const deleted = await this.eventService.deleteEvent(eventId);

      if (!deleted) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
