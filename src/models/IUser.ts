import IDatabaseObject from "./IDatabaseObject";
import ICover from "./ICover";

interface IUser extends IDatabaseObject {
  id: string;
  name: string;
  profileImage: string; // URL of the image from Spotify
  accessToken: string;
  refreshToken: string;
  gallery?: ICover[];
}

export default IUser;
