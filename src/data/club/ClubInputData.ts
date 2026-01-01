export interface CreateClubData {
  name: string;
  description: string;
  organizerId: string;
  registered?: boolean;
}

export interface UpdateClubData {
  name?: string;
  description?: string;
  organizerId?: string;
  registered?: boolean;
}
