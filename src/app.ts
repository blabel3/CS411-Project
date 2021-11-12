import express from "express";
import * as unsplashController from "./controllers/unsplash";

// Create express web app
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.get('/prototype', (req, res) => {
    res.send(`<form action="/photo/">
    <input type="text" placeholder="Search.." name="search">
    <button type="submit">Submit</button>
  </form>`)
});

app.get('/photo/', unsplashController.getPhoto);

export default app;