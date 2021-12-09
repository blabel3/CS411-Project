import ICover from "../models/ICover";
import IUser from "../models/IUser";

import * as databaseController from "./database";



class User implements IUser {
    id: string;
    name: string;
    profileImage: string; // URL of the image from Spotify
    gallery?: ICover[];

    constructor(id: string, name: string, profileImage: string) {
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
    }

    static async findOrCreateUser(user:IUser): Promise<IUser> {
        const dbUser = await databaseController.insertUserIfNotPresent(user)
        return dbUser;
    }

    static async findUserByID(id: string): Promise<IUser> {
        const dbUser = await databaseController.findById<IUser>(id);
        return dbUser;
    }
};

export default User;