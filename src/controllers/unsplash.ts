const axios = require('axios').default;


export const getPhoto = (req, res) => {

    axios.get(`https://api.unsplash.com/photos/random?query=${req.query.search}`, {
        headers: {
            'Accept-Version': 'v1',
            'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
    })
        .then(function (response) {
            // handle success
            console.log(response);
            res.send(`<style>
            * {
                margin: 0;
                padding: 0;
            }
            .imgbox {
                display: grid;
                height: 100%;
            }
            .center-fit {
                max-width: 100%;
                max-height: 100vh;
                margin: auto;
            }
        </style>
        <div class="imgbox">
            <img class="center-fit" src=${response.data.urls.raw}>
        </div>`);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

};




