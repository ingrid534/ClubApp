import type EventDataAccessInterface from './eventDataAccessInterface.js';
import type {
  CreateEventInputData,
  UpdateEventInputData,
} from './eventInputData.js';
import type { Event } from '../../models/EventModel.js';
import prisma from '../../config/client.js';

export default class EventDataAccessObject implements EventDataAccessInterface {
  async getEventById(eventId: string): Promise<Event | null> {
    const event: Event | null = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        name: true,
        description: true,
        date: true,
        location: true,
        clubId: true,
      },
    });

    return event;
  }

  async getEvents(): Promise<Event[]> {
    const events: Event[] = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        date: true,
        location: true,
        clubId: true,
      },
    });

    return events;
  }

  async createEvent(eventData: CreateEventInputData): Promise<Event | null> {
    const event: Event = await prisma.event.create({
      data: eventData,
    });

    return event;
  }

  async updateEvent(
    eventId: string,
    eventData: UpdateEventInputData,
  ): Promise<Event | null> {
    const event: Event = await prisma.event.update({
      where: { id: eventId },
      data: eventData,
    });

    return event;
  }

  async deleteEvent(eventId: string): Promise<void> {
    await prisma.event.delete({
      where: { id: eventId },
    });
  }
}
