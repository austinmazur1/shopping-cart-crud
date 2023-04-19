const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

router.get("/signup", async (req, res, next) => {
  res.render("auth/sign-up");
});

router.post("/signup", async (req, res, next) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);
  try {
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const userFromDB = await User.create({
      email,
      username,
      passwordHash: hashedPassword,
    });

    const userId = userFromDB._id;
    res.redirect(`/dashboard/${userId}`);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.get("/login", async (req, res, next) => {
  res.render("auth/log-in");
});

router.post("/login", async (req, res, next) => {
  console.log("SESSION =======>", req.session);
  const { username, password } = req.body;
  console.log(username, password);

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
      // res.render('users/dashboard', { user });
      //SAVE USER IN THE SESSION
      req.session.currentUser = user;
      console.log(req.body);
      res.redirect(`/dashboard/${username}`);
    } else {
      res.render("auth/login", { errorMessage: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/dashboard/:username", async (req, res, next) => {
  try {
    // const user = await User.findById(id);
    res.render("users/dashboard", { userInSession: req.session.currentUser });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/')
    });
});
module.exports = router;
