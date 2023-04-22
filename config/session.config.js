const session = require("express-session");

// ADDED: require mongostore
const MongoStore = require('connect-mongo');
 
// ADDED: require mongoose
const mongoose = require('mongoose');

module.exports = (app) => {

 // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there
 
  // required for the app when deployed to Heroku (in production)

  //create SESS_SECRET va in .env file

  app.set("trust proxy", 1);

  app.use(
    session({
      //sess_secret is defined in our .env file
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        //not fully standardized as per docs, 'lax - lax same site enforcement'
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60000,
      },
      //make sure to use the var that holds string from .env file
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        ttl: 60 * 60 * 24, // 1 day
      }),
    })
  );
};

//'production' for using secure cookies in production but 
//allowing for development in testing

// saveUninitialized: false, useful for implementing login sessions