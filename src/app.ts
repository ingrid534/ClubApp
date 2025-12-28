import express from 'express';
import checkJwt from './middlewares/checkJwt.js';

const app = express();

// enforce on all endpoints
app.use(checkJwt);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

export default app;
