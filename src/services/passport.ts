import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

import '../services/passport';
import { user } from '../models';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: number, done) => {
  const userExists = await user.findOne({ where: { id: userId } });
  const { password, ...userData } = userExists;

  if (!userExists) {
    done('unathorized');
    return;
  }

  done(null, userData);
});

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      const userExists = await user.findOne({ where: { email: username } });

      if (
        !userExists ||
        (await bcrypt.compare(password, userExists.password)) === false
      ) {
        return done(null, false);
      }
      return done(null, userExists);
    }
  )
);

