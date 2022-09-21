import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Homepage');
});

app.listen(PORT, () => `server running on port : http://localhost:${PORT}`);
