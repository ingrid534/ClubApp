import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

export default router;
