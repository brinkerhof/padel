require("express-async-errors");

const express = require("express");

const AppError = require("./utils/AppError");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((error, req, res, next) => {
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
