import type { UserDataAccessInterface } from '../data/user/UserDataAccessInterface.js';
import { AuthUtils } from '../utils/authUtils.js';

export class AuthService {
  userDAO: UserDataAccessInterface;
  authUtils: AuthUtils;

  constructor(userDAO: UserDataAccessInterface) {
    this.userDAO = userDAO;
    this.authUtils = new AuthUtils();
  }

  async signup(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phoneNumber: string | null,
    password: string,
  ) {
    // check for duplicate username, email, phone
    const usernameExists = this.userDAO.getUserByUsername(username);
    const emailExists = this.userDAO.getUserByEmail(email);
    const phoneExists = phoneNumber
      ? this.userDAO.getUserByPhone(phoneNumber)
      : null;

    if (usernameExists != null) {
      throw new Error('Username already exists.');
    } else if (emailExists != null) {
      throw new Error('Email already exists.');
    } else if (phoneExists != null) {
      throw new Error('Phone number already exists.');
    }

    // hash password
    // create user object
    // generate token with userId and return.
  }
}
