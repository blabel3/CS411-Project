"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPhoto = void 0;
const axios_1 = __importDefault(require("axios"));
const unsplash = axios_1.default.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Accept-Version': 'v1',
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
});
const getRandomPhoto = (req, res) => {
    let query = '';
    if (req.query.search) {
        query = `?query=${req.query.search}`;
    }
    unsplash.get(`/photos/random${query}`)
        .then(function (response) {
        // handle success
        console.log(response);
        res.render("prototype/photo", {
            photoUrl: response.data.urls.regular
        });
    })
        .catch(function (error) {
        // handle error
        console.log(error);
        if (error.response) {
            res.status(error.response.status);
            res.send(error.response.data);
        }
        else {
            res.status(504);
            res.send("Something went wrong.");
        }
    });
};
exports.getRandomPhoto = getRandomPhoto;
//# sourceMappingURL=unsplash.js.map