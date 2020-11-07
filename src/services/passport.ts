import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth';
import passportFacebook from 'passport-facebook';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

import '../services/passport';
import { user } from '../models';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;
const FacebookStrategy = passportFacebook.Strategy;

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
  new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const userExists = await user.findOne({ where: { email: username } });

    if (!userExists || (await bcrypt.compare(password, userExists.password)) === false) {
      return done(null, false);
    }
    return done(null, userExists);
  }),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/user/auth/google/callback',
    },
    async (token, tokenSecret, profile, done) => {
      const userExists = await user.findOne({ where: { email: profile.emails[0].value } });

      if (!userExists) {
        const newUser = await user.create({
          data: {
            email: profile.emails[0].value,
            googleId: profile.id,
            avatarURL: profile.photos[0].value,
          },
        });
        return done(null, newUser);
      }

      return done(null, userExists);
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/user/auth/facebook/callback',
      profileFields: ['id', 'photos', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const userExists = await user.findOne({ where: { email: profile.emails[0].value } });

      if (!userExists) {
        const newUser = await user.create({
          data: {
            email: profile.emails[0].value,
            facebookId: profile.id,
            avatarURL: profile.photos[0].value,
          },
        });
        return done(null, newUser);
      }

      return done(null, userExists);
    },
  ),
);
