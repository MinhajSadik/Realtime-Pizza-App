require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

//Use Function Call
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors & bodyparser
app.use(cors());
app.use(bodyParser.json());

// Passport Config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//Database Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;

connection
  .once("open", () => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log("Database Connection Faild...");
  });

// //Session Store
// let mongoStore = new MongoDbStore({
//   mongooseConnection: connection,
//   collection: "sessions",
// });

//Session Config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // for 24 hours
    // cookie: { maxAge: 1000 * 10 }, // for 10 sec
  })
);

//Assets
app.use(express.static("public"));

//Global Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => console.log(`Listing on Port ${PORT}`));
