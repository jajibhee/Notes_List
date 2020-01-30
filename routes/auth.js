//Two routes, one to get the logged in user and one is to actually log in the user.
const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

// @router      GET api/auth
// @desc        Get logged in user
// @access       Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
  res.send("Get logged in user");
});

// @router      POST api/auth
// @desc        Auth user and get token
// @access       Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //We used await here cause User.findOne returns a promise
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      //compare passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      console.log({ payload });

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
