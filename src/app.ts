import express from 'express';
import checkJwt from './middlewares/checkJwt.js';
import publicRouter from './routes/public/publicRoutes.js';
import privateRouter from './routes/private/privateRoutes.js';

const app = express();

app.use('/api/public', publicRouter);

app.use('/api/private', checkJwt, privateRouter);

export default app;
