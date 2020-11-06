import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';

import apiRoute from './routes/apiRoutes';
import authRoute from './routes/authRoutes';
import './services/passport';

dotenv.config();

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.json({ message: 'hello world!!!!!!' });
});

/* eslint-disable no-console */
app.listen(PORT, () => console.log(`Server has started on localhost:${PORT}!`));
