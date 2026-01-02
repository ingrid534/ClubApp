import type { CreateEventData, UpdateEventData } from './EventInputData.js';
import type { Event } from '../../models/EventModel.js';

export default interface EventDataAccessInterface {
  /**
   * Get event by id
   *
   * Return event by id
   * @param eventId event id
   */
  getEventById(eventId: string): Promise<Event | null>;

  /**
   * Get all events
   * @returns list of events
   */
  getEvents(): Promise<Event[]>;

  /**
   * Create event
   *
   * Return created event
   * @param eventData event data payload
   */
  createEvent(eventData: CreateEventData): Promise<Event | null>;

  /**
   * Update event
   *
   * Return updated event
   * @param eventId event id
   * @param eventData event data payload
   */
  updateEvent(
    eventId: string,
    eventData: UpdateEventData,
  ): Promise<Event | null>;

  /**
   * Delete event by id
   *
   * @param eventId event id
   */
  deleteEvent(eventId: string): Promise<Event | null>;
}
