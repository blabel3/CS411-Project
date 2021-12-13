import axios from 'axios';
import {playlistEndpoint} from "./spotify"

const unsplash = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Accept-Version': 'v1',
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
});

const searchTermsMap = {
    danceability: {high: "dance", threshold: 0.5},
    energy: {low: "calm", high: ["energetic", "energy", "noisy", "loud", "fast"], threshold: 0.5},
    loudness: {low: ["quiet", "soft"], high: ["loud"], threshold: -15},
    speechiness: {high: ["rap", "song"], low: ["music"], threshold: 0.5},
    acousticness: {high: ["acoustic"], low: ["electronic"], threshold: 0.5},
    instrumentalness: {high: ["instrument", "instrumental"], low: ["vocal", "voice", "rap"], threshold: 0.5},
    liveness: {high: ["audience", "concert"], low: ["record", "recording"], threshold: 0.5},
    valence: {high: ["happy", "cheerful", "euphoric"], low: ["sad", "depressed", "angry"], threshold: 0.5},
    tempo: {high: "fast", low: ["slow", "R&B"], threshold: 120}
};

const audioFeaturesToSearchTerms = (playlistAudioFeatures) =>  {
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



export const getRandomPhoto = (req, res) => {
    const playlistAudioFeatures = playlistEndpoint(req, res);
    const searchTerms = audioFeaturesToSearchTerms(playlistAudioFeatures);
    let query = [...searchTerms].join(',');
    if (req.query.search) {
        query = `?query=${req.query.search}`;
    }

    unsplash.get(`/photos/random${query}`)
        .then( response => {
            // handle success
            console.log(response);
            res.render("prototype/photo", {
                photoUrl: response.data.urls.regular
            });
        })
        .catch( error => {
            // handle error
            console.log(error);

            if (error.response) {
                res.status(error.response.status);
                res.send(error.response.data);
            } else {
                res.status(504);
                res.send("Something went wrong.");
            }
            
        });

};




