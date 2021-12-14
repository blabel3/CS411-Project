import axios from 'axios';
import IPlaylistFeatures from '../models/IPlaylistFeatures';

const unsplash = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Accept-Version': 'v1',
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
});

const searchTermsMap = {
    danceability: {high: ["dance", "dance-party"], threshold: 0.5},
    energy: {low: ["calm", "relaxed"], high: ["energetic", "noisy"], threshold: 0.5},
    loudness: {low: ["quiet", "soft"], high: ["loud"], threshold: -15},
    speechiness: {high: ["rap", "song"], low: ["music"], threshold: 0.5},
    acousticness: {high: ["acoustic"], low: ["electronic"], threshold: 0.5},
    instrumentalness: {high: ["instrument", "instrumental"], low: ["vocal", "voice", "rap"], threshold: 0.5},
    liveness: {high: ["audience", "concert"], low: [""], threshold: 0.5},
    valence: {high: ["happy", "cheerful", "euphoric"], low: ["sad", "depressed", "angry"], threshold: 0.5},
    tempo: {high: "fast", low: ["slow", "R&B"], threshold: 120}
};

function audioFeaturesToSearchTerms(playlistAudioFeatures: IPlaylistFeatures) {
    const searchTermsList = new Set();
    for (const feature in playlistAudioFeatures) {
        if (playlistAudioFeatures[feature] > searchTermsMap[feature].threshold) {
            searchTermsList.add(searchTermsMap[feature].high);
        }
        else {
            searchTermsList.add(searchTermsMap[feature].low);
        }
    }
    return searchTermsList;
}

export async function getRandomPhoto(query?: string): Promise<string> {
    const response = await unsplash.get(`/photos/random?query=${query}`);
    return response.data.urls.regular;
}

export async function getPhotoForPlaylist(audioFeatures: IPlaylistFeatures): Promise<string> {
    const searchTerms = audioFeaturesToSearchTerms(audioFeatures);
    // Assuming that unsplash api query only supports one search term, as it says on their documentation.
    console.log(searchTerms);
    let query = '';
    // If there are search terms, pick one at random to use in our search. 
    if (searchTerms){
        const flatTerms = [].concat(...searchTerms);
        query = flatTerms[Math.floor(Math.random() * flatTerms.length)];
    } else {
        query = "Music"; // default 
    }

    console.log(query);
    
    return await getRandomPhoto(query);
}

export async function getRandomPhotoEndpoint(req, res) {
    let query = '';
    if (req.query.search) {
        query = req.query.search;
    }

    try {
        const photoUrl = await getRandomPhoto(query);
        res.render("prototype/photo", {
            photoUrl: photoUrl
        });
    } catch (error) {
        // handle error
        console.log(error);

        if (error.response) {
            res.status(error.response.status);
            res.send(error.response.data);
        } else {
            res.status(504);
            res.send("Something went wrong.");
        }
    }
}




