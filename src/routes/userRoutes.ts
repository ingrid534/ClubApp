import type { Request, Response } from 'express';
import { Router } from 'express';
import { UserDataAccessObject } from '../data/user/UserDataAccessObject.js';
import { UserController } from '../controllers/userController.js';
import prisma from '../data/client.js';

// not sure if i should be importing prisma here
const router = Router();
const userDao = new UserDataAccessObject(prisma);
const controller = new UserController(userDao);

// create user
// TODO: validate that req.body types are all valid for type CreateUserData (as needed for controller.createUser)
// or use middleware to validate not sure
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await controller.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
