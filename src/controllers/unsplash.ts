import axios from "axios";

const unsplash = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        "Accept-Version": "v1",
        "Authorization": `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
});


export const getRandomPhoto = (req, res) => {

    let query = "";
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




