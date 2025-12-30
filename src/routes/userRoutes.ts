import { Router } from 'express';
import UserDataAccessObject from '../data/user/UserDataAccessObject.js';
import UserController from '../controllers/userController.js';

// not sure if i should be importing prisma here
const router = Router();
const userDao = new UserDataAccessObject();
const userController = new UserController(userDao);

// create user
router.post('/create', userController.createUser);

// read all users
router.get('/', userController.getAllUsers);

// read one user by id
router.get('/:id', userController.getUserById);

// get all the clubs followed by this user
router.get('/:id/following', userController.getFollowingClubs);

// get all the clubs organized by this user
router.get('/:id/organizing', userController.getOrganizingClubs);

// update user
router.put('/:id', userController.updateUser);

// add a club to user's following
router.post('/:id/following', userController.addClubFollowing);

// remove a club from user's following
router.delete('/:id/following', userController.deleteClubFollowing);

// add a club to this user's organizing clubs
router.patch('/:id/organizing', userController.addOrganizingClub);

// remove a club from user's organizing clubs
router.patch('/:id/organizing', userController.deleteOrganizingClub);

// delete user
router.delete('/:id', userController.deleteUser);

export default router;
