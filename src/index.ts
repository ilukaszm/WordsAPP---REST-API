import express from 'express';

const app = express();
const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.json({ message: 'hello world!' });
});

app.listen(PORT, () => console.log(`Server has started on localhost:${PORT}`));
