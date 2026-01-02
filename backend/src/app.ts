import express from 'express';
import categoryRouter from './routes/categoryRoutes.js';
import clubRouter from './routes/clubRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use('/api/category', categoryRouter);
app.use('/api/clubs', clubRouter);
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);

export default app;
