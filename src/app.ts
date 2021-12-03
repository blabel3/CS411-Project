import express from "express";
import path from 'path';
import * as unsplashController from "./controllers/unsplash";

// Create express web app
const app = express();
app.set('views', path.join(__dirname, '../src/views'));
app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render("index");
  });

app.get('/prototype', (req, res) => {
    res.render("prototype/index");
});

app.get('/photo/', unsplashController.getRandomPhoto);


export default app;