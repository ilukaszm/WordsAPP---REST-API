import express from 'express';
import bodyParser from 'body-parser';

import apiRoute from './routes/api';

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'hello world!' });
});

app.use('/api', apiRoute);

app.listen(PORT, () => console.log(`Server has started on localhost:${PORT}`));
