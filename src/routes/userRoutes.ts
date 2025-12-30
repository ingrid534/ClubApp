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
// TODO: validate that req.body types are all valid for type CreateUserData (as needed for controller.createUser)
// or use middleware to validate not sure
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const user = await controller.createUser(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// });

// create user
router.post('/create', userController.createUser);

// read all users
router.get('/', userController.getAllUsers);

// read one user by id
router.get('/:id', userController.getUserById);

// get all the clubs followed by this user
router.get('/:id/clubFollowing', userController.getFollowingClubs);

export default router;
