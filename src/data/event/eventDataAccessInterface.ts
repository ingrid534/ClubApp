import type { EventInputData } from './eventInputData.js';
import type { Event } from '../../model/EventModel.js';

export interface EventDataAccessInterface {
  getEventById(eventId: string): Promise<Event | null>;
  createEvent(eventData: EventInputData): Promise<Event | null>;
  updateEvent(
    eventId: string,
    eventData: EventInputData,
  ): Promise<Event | null>;
  deleteEvent(eventId: string): Promise<void>;
  listEvents(clubId: string): Promise<Event[]>;
}
