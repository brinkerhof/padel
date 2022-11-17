import "express-async-errors";

import express, { json, urlencoded } from "express";

import AppError from "./utils/AppError.js";

import routes from "./routes/index.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes);

app.use((error, req, res) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error occurred",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
