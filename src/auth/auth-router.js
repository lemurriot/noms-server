const express = require("express");

const authRouter = express.Router();

authRouter.route("/googleOAuth").get((req, res) => {
  res.send("logging in with google");
});

authRouter.route("/logout").get((req, res) => {
  res.send("logging out");
});

module.exports = authRouter;
