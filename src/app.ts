import path from 'path';
import express from "express";
import session from 'express-session';

import * as unsplashController from "./controllers/unsplash";
import * as spotifyController from "./controllers/spotify";
import passportController from "./controllers/passport";
import IUser from './models/IUser';

// Create express web app
const app = express();
app.set('views', path.join(__dirname, '../src/views'));
app.set("view engine", "pug");

app.use(session({ secret: 'cool potato', resave: true, saveUninitialized: true }));
app.use(passportController.initialize());
app.use(passportController.session());

// Routes 
app.get('/', (req, res) => {
  const user = <IUser> req.user;
  console.log(`User: ${user?.name}`);
  if (user){
    res.render("index", {
      displayName: user.name,
      profileImage: user.profileImage
    });
  } else {
    res.render("index");
  }
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
    // This is an option that's supposed to make the dialogue always show, but the passport-spotify team 
    // seems to not reference it in theri strategy so we can't use this!

    // showDialog: true  
  })
);

app.get('/auth/spotify/callback',
  passportController.authenticate('spotify', {failureRedirect: '/'}),
  (req, res) => {
    // Authentication successful.
    res.redirect('/');
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

app.get('/playlist/', spotifyController.playlistEndpoint)

app.get('/photo/', unsplashController.getRandomPhoto);

export default app;