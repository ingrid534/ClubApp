import { Router } from 'express';
import checkJwt from '../middlewares/checkJwt.js';
import UserDataAccessObject from '../data/user/UserDataAccessObject.js';
import UserService from '../services/userService.js';
import UserController from '../controllers/userController.js';

const userRouter = Router();
const userDataAccessObject = new UserDataAccessObject();
const userService = new UserService(userDataAccessObject);
const userController = new UserController(userService);

// create user
userRouter.post('/create', userController.createUser);

// read all users
userRouter.get('/', userController.getAllUsers);

// read one user by id
userRouter.get('/:id', userController.getUserById);

// get all the clubs followed by this user
userRouter.get('/:id/following', userController.getFollowingClubs);

// get all the clubs organized by this user
userRouter.get('/:id/organizing', userController.getOrganizingClubs);

// update user
userRouter.put('/:id', userController.updateUser);

// add a club to user's following
userRouter.post('/:id/following', userController.addClubFollowing);

// remove a club from user's following
userRouter.delete('/:id/following', userController.deleteClubFollowing);

// add a club to this user's organizing clubs
userRouter.patch('/:id/organizing', userController.addOrganizingClub);

// remove a club from user's organizing clubs
userRouter.patch('/:id/organizing', userController.deleteOrganizingClub);

// delete user
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
