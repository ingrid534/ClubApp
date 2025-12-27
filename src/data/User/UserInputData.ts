export interface CreateUserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  passwordHash: string;
}

export interface UpdateUserData {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  passwordHash?: string;
}
