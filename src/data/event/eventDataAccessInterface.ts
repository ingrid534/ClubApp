import type {
  CreateEventInputData,
  UpdateEventInputData,
} from './eventInputData.js';
import type { Event } from '../../model/EventModel.js';

export interface EventDataAccessInterface {
  /**
   * Get event by id
   *
   * Return event by id
   * @param eventId event id
   */
  getEventById(eventId: string): Promise<Event | null>;

  /**
   * Create event
   *
   * Return created event
   * @param eventData event data payload
   */
  createEvent(eventData: CreateEventInputData): Promise<Event | null>;

  /**
   * Update event
   *
   * Return updated event
   * @param eventId event id
   * @param eventData event data payload
   */
  updateEvent(
    eventId: string,
    eventData: UpdateEventInputData,
  ): Promise<Event | null>;

  /**
   * Delete event by id
   *
   * @param eventId event id
   */
  deleteEvent(eventId: string): Promise<void>;

  /**
   * list events by club id
   *
   * @param clubId club id
   */
  listEvents(clubId: string): Promise<Event[]>;
}
