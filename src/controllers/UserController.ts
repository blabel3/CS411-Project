import ICover from "../models/ICover";
import IUser from "../models/IUser";

import * as databaseController from "./database";


export async function updateTokens(user: IUser, newAccessToken: string, newRefreshToken: string) {
    // We assume databse is already set up. 
    const newUser: IUser = {
        id: user.id,
        name: user.name,
        profileImage: user.profileImage,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
    const newDbUser = await databaseController.update<IUser>(newUser);
    return newDbUser;
}

/**
 * 
 * @param user Either gets user from database or creates user in database. Updates tokens if needed. 
 * @returns 
 */
export async function getUser(user:IUser): Promise<IUser> {
    const dbUser = await databaseController.read<IUser>(user.id);

    if (dbUser) {
        console.log("User found in DB");
        console.log("Updating tokens...");
        const updatedUser = await this.updateTokens(dbUser, user.accessToken, user.refreshToken)
        return updatedUser;
    }

    console.log("New user, not currently in DB");
    const newDbUser = await databaseController.create<IUser>(user);
    return newDbUser;
}

export function findUserByID(id: string): Promise<IUser> {
    return databaseController.read<IUser>(id)
}