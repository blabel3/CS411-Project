import Cover from './Cover';

class User {
    id: string;
    name: string;
    profileImage: string; // URL of the image from Spotify
    gallery?: Cover[];

    constructor(id: string, name: string, profileImage: string) {
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
    }
};

export default User;