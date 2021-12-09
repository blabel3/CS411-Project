import passport from "passport";
import {Strategy as SpotifyStrategy} from 'passport-spotify';

import IUser from '../models/IUser';
import User from './user';

/**
 * Session setup: Passport needs to be able to serialize and deserialize the users. 
 * This means we have to store the user ID in the database, and find the user ID when deserializing. 
 */
passport.serializeUser(async (user:IUser, done) => {
    // TODO: Store user in our db
  console.log('Serialize');
  console.log(user);
  const dbUser = await User.findOrCreateUser(user);
  done(null, dbUser);
});

passport.deserializeUser(async (user:IUser, done) => {
    // TODO: Fetch user from our db
  console.log('Deserialize');
  //console.log(id);
  const dbUser = await User.findUserByID(user.id);
  done(null, dbUser);
});

passport.use(
  new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/spotify/callback`
  },
  async (accessToken, refreshToken, expires_in, profile, done) => {
    //return done(null, profile);
    console.log('Hooha');
    const user = await User.findOrCreateUser({id: profile.id, name: profile.displayName, profileImage: profile.photos[0].value});
    console.log(user);
    return done(null, user);
    // TODO: Return user object that matches DB instead of full profile.  
    //User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
    //  return done(err, user);
    //});
  }
));

export default passport;