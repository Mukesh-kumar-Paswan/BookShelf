const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { validateUser, authenticateToken } = require("../utils/middleware");

router.post(
  "/signup",
  validateUser,
  wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();

    const payload = {
      id: saveUser._id,
      username: saveUser.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res
      .status(201)
      .json({ msg: "User Created Successfully", user: { username: username } });
  }),
);

router.post(
  "/signin",
  wrapAsync(async (req, res) => {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username: username });
    if (!userExist) {
      return res.status(401).json({ msg: "Username or Password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (isMatch) {
      const payload = {
        id: userExist._id,
        username: username,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      res
        .status(200)
        .json({ msg: "User Login Successfully", user: { username: username } });
    } else {
      res.status(401).json({ msg: "Username or Password is incorrect" });
    }
  }),
);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ msg: "User Logged out successfully" });
});

router.get("/verify", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ msg: "Verified", user: { username: req.currUser.username } });
});

module.exports = router;
