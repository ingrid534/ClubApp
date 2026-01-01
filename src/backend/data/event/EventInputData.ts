export interface CreateEventData {
  name: string;
  description: string;
  location: string;
  date: Date;
  clubId: string;
}

export interface UpdateEventData {
  name?: string;
  description?: string;
  location?: string;
  date?: Date;
}
