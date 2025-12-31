import type EventDataAccessInterface from './eventDataAccessInterface.js';
import type { CreateEventData, UpdateEventData } from './EventInputData.js';
import type { Event } from '../../models/EventModel.js';
import prisma from '../../config/client.js';

export default class EventDataAccessObject implements EventDataAccessInterface {
  async getEventById(eventId: string): Promise<Event | null> {
    const event: Event | null = await prisma.event.findUnique({
      where: { id: eventId },
    });

    return event;
  }

  async getEvents(): Promise<Event[]> {
    const events: Event[] = await prisma.event.findMany({});

    return events;
  }

  async createEvent(eventData: CreateEventData): Promise<Event | null> {
    const event: Event = await prisma.event.create({
      data: eventData,
    });

    return event;
  }

  async updateEvent(
    eventId: string,
    eventData: UpdateEventData,
  ): Promise<Event | null> {
    const event: Event = await prisma.event.update({
      where: { id: eventId },
      data: eventData,
    });

    return event;
  }

  async deleteEvent(eventId: string): Promise<Event | null> {
    return await prisma.event.delete({
      where: { id: eventId },
    });
  }
}
