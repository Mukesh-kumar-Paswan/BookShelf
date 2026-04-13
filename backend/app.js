// dotenv
require("dotenv").config({ quiet: true });

// Express
const express = require("express");
const app = express();

// routes
const bookShelfRouter = require("./routes/bookshelf");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/auth");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Others
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

// CORS
const cors = require("cors");

const corsOptions = {
  origin: process.env.CROSS_ORIGIN,
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Mongoose
const mongoose = require("mongoose");

const main = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DataBase Connected Successfully");
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server Started Successfully");
    });
  } catch (err) {
    console.log(err);
  }
};

// Starting Server

app.get("/", (req, res) => {
  res.send(
    `<h1> Your book shelf is ready. Please visit <a href="/bookshelf">BookShelf</a> to continue :) </h1>`,
  );
});

app.use("/bookshelf", bookShelfRouter);

app.use("/bookshelf/:id/reviews", reviewRouter);

app.use("/", userRouter);

app.use((req, res, next) => {
  return next(createError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { status = 404, message = "Error Please Try Again Later" } = err;
  res.status(status).json({ msg: message });
});

main();
