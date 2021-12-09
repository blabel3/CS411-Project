import path from 'path';
import express from "express";
import session from 'express-session';

import * as unsplashController from "./controllers/unsplash";
import passportController from "./controllers/passport";

// Create express web app
const app = express();
app.set('views', path.join(__dirname, '../src/views'));
app.set("view engine", "pug");

app.use(session({ secret: 'cool potato', resave: true, saveUninitialized: true }));
app.use(passportController.initialize());
app.use(passportController.session());

// Routes 
app.get('/', (req, res) => {
  console.log(req.user);
  res.render("index");
});

app.get('/prototype', (req, res) => {
  res.render("prototype/index");
});

app.get('/auth/spotify', 
  passportController.authenticate('spotify', {
    scope: ['ugc-image-upload', 
      'playlist-modify-private', 'playlist-read-private', 
      'playlist-modify-public', 'playlist-read-collaborative'
    ],
    // showDialog: true
  })
);

app.get('/auth/spotify/callback',
  passportController.authenticate('spotify', {failureRedirect: '/'}),
  (req, res) => {
    // Authentication successful.
    res.redirect('/logged_in_home');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


/**
 * Middleware that makes sure user is successfulkly authenticated with Spotify , otherwise will get redirected to log in. 
 */
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/spotify');
};

app.get('/photo/', unsplashController.getRandomPhoto);

export default app;