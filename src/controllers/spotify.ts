import SpotifyWebApi from 'spotify-web-api-node';

const callbackURL = process.env.COSMOS_DATABASE == "Users-Test" ? 
`http://localhost:${process.env.PORT}/auth/spotify/callback` :
`https://cs411-spotify-cover-generator.azurewebsites.net/auth/spotify/callback`;

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: callbackURL
});

async function getClientAccessToken() {
  // Retrieve an access token.
  try {
    const tokenData = await spotifyApi.clientCredentialsGrant();
    if (tokenData){
      console.log('The access token expires in ' + tokenData.body['expires_in']);
      console.log('The access token is ' + tokenData.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(tokenData.body['access_token']);
    } else {
      console.log('Could make request but did not find a token.');
    }
  } catch (error) {
    console.log(error);
  }
}

async function getPlaylistData(playlistID: string): Promise<SpotifyApi.SinglePlaylistResponse> {
  await getClientAccessToken();
  const playlistData = await spotifyApi.getPlaylist(playlistID);
  return playlistData?.body;
}

async function getAudioFeaturesForTracks(trackIDs: string[]): Promise<SpotifyApi.MultipleAudioFeaturesResponse> {
  await getClientAccessToken();
  const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(trackIDs);
  return audioFeatures?.body;
}

function cleanPlaylistInput(playlistInput: string): string {
  console.log(`Raw input: ${playlistInput}`);
  if (playlistInput.includes("https://open.spotify.com/playlist/")){
    playlistInput = playlistInput.substring("https://open.spotify.com/playlist/".length);
    console.log(`cleaned input: ${playlistInput}`);
  }

  const base62Regex = new RegExp("^[0-9A-Za-z_-]{22}$");
  if (base62Regex.test(playlistInput)){
    return playlistInput;
  } else {
    return null;
  }
}

export async function playlistEndpoint(req, res) {
  const input = req.query?.playlist;
  if (!input){
    console.log("Nothing submitted.");
    res.send("Empty lol");
  }

  const cleanInput = cleanPlaylistInput(input);

  if (!cleanInput){
    res.send(`Input seems to be invalid. Playlist ID: ${cleanInput}`);
  }

  const playlistData = await getPlaylistData(cleanInput);

  const trackIDs = playlistData["tracks"]["items"].map(song => song["track"]["id"]);
  console.log(playlistData["tracks"]["items"]);

  const audioFeaturesData = await getAudioFeaturesForTracks(trackIDs);

  res.send(audioFeaturesData);
}
