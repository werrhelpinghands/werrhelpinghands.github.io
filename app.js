const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// Connecting to database
mongoose
  .connect(process.env.MONGO_URL, {
    //mongodb://127.0.0.1:27017/hh
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT,()=>{
  console.log('Server Running');
})

// Routes
var contactRouter = require("./routes/contactRouter");
var authRouter = require("./routes/authRouter");

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
