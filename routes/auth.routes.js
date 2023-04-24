const express = require("express");
const router = express.Router();
//import bcrypt and define saltrounds
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
//import user model
const User = require("../models/User.model");
//import middlware
const { isLoggedIn } = require("../middleware/route-guard");

//// ROUTES ////

//route to render signup page, sending middleware
router.get("/signup", isLoggedIn, async (req, res, next) => {
  res.render("auth/sign-up");
});

//POST route to handle sign up data
router.post("/signup", async (req, res, next) => {
  try {
    const { email, username, password, cart } = req.body;
    //hash users password
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const userFromDB = await User.create({
      email,
      username,
      passwordHash: hashedPassword, //password is = hashedpassword
      cart,
    });

    const userId = userFromDB._id;
    res.redirect(`/dashboard/${userId}`);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//GET route to render login
router.get("/login", async (req, res, next) => {
  res.render("auth/log-in");
});

//POST route to log user in
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  //find the user
  try {
    if (username === "" || password === "") {
      res.render("auth/login", {
        errorMessage: "Please enter both, email and password to login",
      });
      return;
    }

    // mongoose query to check our db and find the user
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    // If we cant find user, return error mesesage
    if (!user) {
      return res.status(401).send("Invalid username or password");
    } else if (bcryptjs.compareSync(password, user.passwordHash)) {
      //SAVE USER IN THE SESSION
      req.session.currentUser = user;
      res.redirect(`/dashboard/${user._id}`);
    } else {
      res.render("auth/login", { errorMessage: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET route to render users dashboard
router.get("/dashboard/:id", async (req, res, next) => {
  try {
    res.render("users/dashboard", { userInSession: req.session.currentUser });
  } catch (error) {
    next(error);
  }
});

//POST route to log user out
router.post("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
