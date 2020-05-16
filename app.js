const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// Connecting to database 'mongodb://127.0.0.1:27017/hh' process.env.MONGO_URL
mongoose
  .connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

  const PORT = process.env.PORT || 3000
app.listen( PORT,()=>{
  console.log('Server Running');
})

// Routes
var contactRouter = require("./routes/contactRouter");
var authRouter = require("./routes/authRouter");
var jobRouter = require("./routes/jobRouter");
var jobNewsRouter = require("./routes/jobNewsRouter");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}))

//Routes
app.use("/contact.html", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/news", jobNewsRouter);
