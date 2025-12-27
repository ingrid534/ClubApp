import type { PrismaClient } from '../../generated/prisma/client.js';
import type { EventDataAccessInterface } from './eventDataAccessInterface.js';
import type {
  CreateEventInputData,
  UpdateEventInputData,
} from './eventInputData.js';
import type { Event } from '../../model/EventModel.js';

export class EventDataAccessObject implements EventDataAccessInterface {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getEventById(eventId: string): Promise<Event | null> {
    const event: Event | null = await this.prisma.event.findUnique({
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

  async createEvent(eventData: CreateEventInputData): Promise<Event | null> {
    const event: Event = await this.prisma.event.create({
      data: eventData,
    });

    return event;
  }

  async updateEvent(
    eventId: string,
    eventData: UpdateEventInputData,
  ): Promise<Event | null> {
    const event: Event = await this.prisma.event.update({
      where: { id: eventId },
      data: eventData,
    });

    return event;
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.prisma.event.delete({
      where: { id: eventId },
    });
  }
}
