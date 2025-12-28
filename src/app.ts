import express from 'express';
import jwtCheck from './middlewares/jwtCheck.js';
import authRoutes from './routes/authRoutes';

const app = express();

const port = process.env.PORT || 8080;

export default app;

// enforce on all endpoints
// TODO: do not enforce on all endpoints - fix this.
app.use(jwtCheck);

app.use(authRoutes);
