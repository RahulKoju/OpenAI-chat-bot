import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './connection';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectToDatabase();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, MERN with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
