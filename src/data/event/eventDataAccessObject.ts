import type EventDataAccessInterface from './EventDataAccessInterface.js';
import type { CreateEventData, UpdateEventData } from './EventInputData.js';
import type { Event } from '../../models/EventModel.js';
import prisma from '../../config/client.js';
import { handlePrismaError } from '../../utils/prismaErrors.js';

export default class EventDataAccessObject implements EventDataAccessInterface {
  async getEventById(eventId: string): Promise<Event | null> {
    try {
      const event: Event | null = await prisma.event.findUnique({
        where: { id: eventId },
      });

      return event;
    } catch (err) {
      handlePrismaError(err, 'EventDataAccessObject.getEventById');
      return null;
    }
  }

  async getEvents(): Promise<Event[]> {
    try {
      const events: Event[] = await prisma.event.findMany({});
      return events;
    } catch (err) {
      handlePrismaError(err, 'EventDataAccessObject.getEvents');
      return [];
    }
  }

  async createEvent(eventData: CreateEventData): Promise<Event | null> {
    try {
      const event: Event = await prisma.event.create({
        data: eventData,
      });
      return event;
    } catch (err) {
      handlePrismaError(err, 'EventDataAccessObject.createEvent');
      return null;
    }
  }

  async updateEvent(
    eventId: string,
    eventData: UpdateEventData,
  ): Promise<Event | null> {
    try {
      const event: Event = await prisma.event.update({
        where: { id: eventId },
        data: eventData,
      });
      return event;
    } catch (err) {
      handlePrismaError(err, 'EventDataAccessObject.updateEvent');
      return null;
    }
  }

  async deleteEvent(eventId: string): Promise<Event | null> {
    try {
      return await prisma.event.delete({
        where: { id: eventId },
      });
    } catch (err) {
      handlePrismaError(err, 'EventDataAccessObject.deleteEvent');
      return null;
    }
  }
}
