export interface CreateClubData {
  id: string;
  name: string;
  description: string;
  organizerId: string;
}

export interface UpdateClubData {
  name?: string;
  description?: string;
  organizerId?: string;
}
