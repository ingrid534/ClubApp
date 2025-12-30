import { Router } from 'express';
import { UserDataAccessObject } from '../data/user/UserDataAccessObject.js';
import { UserController } from '../controllers/userController.js';
import prisma from '../config/client.js';

// not sure if i should be importing prisma here
const router = Router();
const userDao = new UserDataAccessObject(prisma);
const userController = new UserController(userDao);

// create user
router.post('/users/create', userController.createUser);

// read all users
router.get('/users/', userController.getAllUsers);

// read one user by id
router.get('/users/:id', userController.getUserById);

// get all the clubs followed by this user
router.get('/users/:id/following', userController.getFollowingClubs);

// get all the clubs organized by this user
router.get('/users/:id/organizing', userController.getOrganizingClubs);

// update user
router.put('/users/:id', userController.updateUser);

// add a club to user's following
router.post('/users/:id/following', userController.addClubFollowing);

// remove a club from user's following
router.delete('/users/:id/following', userController.deleteClubFollowing);

// add a club to this user's organizing clubs
router.patch('/users/:id/organizing', userController.addOrganizingClub);

// remove a club from user's organizing clubs
router.patch('/users/:id/organizing', userController.deleteOrganizingClub);

// delete user
router.delete('/users/:id', userController.deleteUser);

export default router;
