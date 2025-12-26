export interface CreateClubInputData {
  name: string;
  organizerId: string;
}

export interface UpdateClubInputData {
  name?: string;
  organizerId?: string;
  registered?: boolean;
}
