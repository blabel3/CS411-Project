import ICover from './ICover';

interface IUser {
    id: string;
    name: string;
    profileImage: string; // URL of the image from Spotify
    gallery?: ICover[];
}

export default IUser;