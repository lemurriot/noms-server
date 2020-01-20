const express = require("express");
const passport = require("passport");

const authRouter = express.Router();

authRouter.get(
  "/google-oauth",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send("you reached the callback URI");
  }
);

authRouter.get("/logout", (req, res) => {
  res.send("logging out");
});

module.exports = authRouter;
