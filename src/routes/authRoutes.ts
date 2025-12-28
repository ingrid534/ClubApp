import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signup', async (req, res))
