import express from 'express';
const router = express.Router();
import { signup, getUsers } from '../controllers/users';
import { validateUser } from '../controllers/validation';
import passport from 'passport';
import { localStrategy } from '../utils/auth';
import { userInfo } from 'os';
import { User } from '../models';

passport.use(localStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user:User, done) => {
    done(null, user);
});

router.get('/users', getUsers);

// router.get('/login/:id',  login)

router.post('/login',  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
  }))

router.post('/signup', validateUser, signup);

router.post('/logout', (req, res, next)=> {
    req.logout((err)=> {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

export default router;
