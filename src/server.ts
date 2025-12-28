import app from './app.js';
import config from './config/config.js';
import dotenv from 'dotenv';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

dotenv.config();

const test = process.env.JWT_SECRET;
