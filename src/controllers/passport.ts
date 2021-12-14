import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";

import IUser from "../models/IUser";
import * as UserController from "./UserController";

const callbackURL =
  process.env.COSMOS_DATABASE == "Users-Test"
    ? `http://localhost:${process.env.PORT}/auth/spotify/callback`
    : `https://cs411-spotify-cover-generator.azurewebsites.net/auth/spotify/callback`;

/**
 * Session setup: Passport needs to be able to serialize and deserialize the users.
 * This means we have to store the user ID in the database, and find the user ID when deserializing.
 */

/**
 * Serializes unique user data for the session
 */
passport.serializeUser((user: IUser, done) => {
  console.log("Serialize");
  console.log(`User id: ${user.id}`);
  done(null, user.id);
});

/**
 * Gets the full user object from whatever we stored unique to the user.
 */
passport.deserializeUser(async (id: string, done) => {
  console.log("Deserialize");
  console.log(`User id: ${id}`);
  try {
    const user = await UserController.findUserByID(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // console.log(`aT: ${accessToken}, rT: ${refreshToken}, exp: ${expires_in}`)
      UserController.getUser({
        id: profile.id,
        name: profile.displayName,
        profileImage: profile.photos[0],
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
        .then((user) => {
          console.log(user);
          done(null, user);
        })
        .catch((error) => {
          done(error, null);
        });
    }
  )
);

export default passport;
