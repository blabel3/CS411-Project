import passport from "passport";
import {Strategy as SpotifyStrategy} from 'passport-spotify';

/**
 * Session setup: Passport needs to be able to serialize and deserialize the users. 
 * This means we have to store the user ID in the database, and find the user ID when deserializing. 
 */
passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log(obj);
  done(null, obj);
});

passport.use(
  new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/spotify/callback`
  },
  (accessToken, refreshToken, expires_in, profile, done) => {
    return done(null, profile);
    //User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
    //  return done(err, user);
    //});
  }
));

export default passport;