export interface CreateUserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

export interface UpdateUserData {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}
