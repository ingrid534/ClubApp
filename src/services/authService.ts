import type { UserDataAccessInterface } from '../data/user/UserDataAccessInterface.js';
import type { CreateUserData } from '../data/user/UserInputData.js';
import { User } from '../model/UserModel.js';
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
    const hashedPass = this.authUtils.hashPassword(password);
    const userInput = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      passwordHash: hashedPass,
    };

    const user = this.userDAO.createUser(userInput);
    // generate token with userId and return.
  }
}
