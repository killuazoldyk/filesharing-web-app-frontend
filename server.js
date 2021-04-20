require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
// Cors
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
};

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

//dont touch this
//CORS middleware
var corsMiddleware = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );

  next();
};

app.use(corsMiddleware);

//////////////////////////

app.use(cors(corsOptions));
app.use(express.static("public"));

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
