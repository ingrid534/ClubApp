export interface CreateEventInputData {
  name: string;
  description: string;
  location: string;
  date: Date;
  clubId: string;
}

export interface UpdateEventInputData {
  name?: string;
  description?: string;
  location?: string;
  date?: Date;
}
