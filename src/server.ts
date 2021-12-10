import app from "./app";

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default server;
