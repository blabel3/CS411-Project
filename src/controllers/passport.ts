import passport from "passport";
import {Strategy as SpotifyStrategy} from 'passport-spotify';

import IUser from '../models/IUser';
import * as UserController from "./UserController";

/**
 * Session setup: Passport needs to be able to serialize and deserialize the users. 
 * This means we have to store the user ID in the database, and find the user ID when deserializing. 
 */

/**
 * Serializes unique user data for the session
 */
passport.serializeUser( (user:IUser, done) => {
  console.log('Serialize');
  console.log(`User id: ${user.id}`);
  done(null, user.id);
});

/**
 * Gets the full user object from whatever we stored unique to the user. 
 */
passport.deserializeUser( (id:string, done) => {
    // TODO: Fetch user from our db
  console.log('Deserialize');
  console.log(`User id: ${id}`);
  UserController.findUserByID(id)
    .then(user => {
        done(null, user);
    })
    .catch(error => {
        done(error, null);
    });
});

passport.use(
  new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/spotify/callback`
  },
  async (accessToken, refreshToken, expires_in, profile, done) => {
    // console.log(`aT: ${accessToken}, rT: ${refreshToken}, exp: ${expires_in}`)
    const user = await UserController.getUser({id: profile.id, 
        name: profile.displayName, 
        profileImage: profile.photos[0],
        accessToken: accessToken,
        refreshToken: refreshToken
    });
    console.log(user);
    return done(null, user);
  }
));

export default passport;