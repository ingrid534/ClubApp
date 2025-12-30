import type { Request, Response } from 'express';
import { Router } from 'express';
import { UserDataAccessObject } from '../data/user/UserDataAccessObject.js';
import { UserController } from '../controllers/userController.js';
import prisma from '../config/client.js';

// not sure if i should be importing prisma here
const router = Router();
const userDao = new UserDataAccessObject(prisma);
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

// delete user
router.delete('/:id', userController.deleteUser);

export default router;
