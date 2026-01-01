import type { Event } from '../models/EventModel.js';
import type EventDataAccessInterface from '../data/event/EventDataAccessInterface.js';
import type {
  CreateEventData,
  UpdateEventData,
} from '../data/event/EventInputData.js';

export default class EventService {
  private eventDao: EventDataAccessInterface;
  constructor(eventDao: EventDataAccessInterface) {
    this.eventDao = eventDao;
  }

  async getEventById(eventId: string): Promise<Event> {
    const event: Event | null = await this.eventDao.getEventById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async getAllEvents(): Promise<Event[]> {
    const events: Event[] = await this.eventDao.getEvents();
    return events;
  }

  async createEvent(eventData: CreateEventData): Promise<Event> {
    const event: Event | null = await this.eventDao.createEvent(eventData);
    if (!event) {
      throw new Error('Failed to create event');
    }
    return event;
  }

  async updateEvent(
    eventId: string,
    eventData: UpdateEventData,
  ): Promise<Event> {
    const event: Event | null = await this.eventDao.updateEvent(
      eventId,
      eventData,
    );
    if (!event) {
      throw new Error('Failed to update event');
    }
    return event;
  }

  async deleteEvent(eventId: string): Promise<Event> {
    const event: Event | null = await this.eventDao.deleteEvent(eventId);
    if (!event) {
      throw new Error('Failed to delete event');
    }
    return event;
  }
}
