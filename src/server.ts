import dotenv = require('dotenv');
import app from "./app";

dotenv.config();

const port = process.env.SERVER_PORT;

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default server;
