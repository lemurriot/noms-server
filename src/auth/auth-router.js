const express = require("express");
const passport = require("passport");
const { requestOrigin } = require("../config");

const authRouter = express.Router();

authRouter.get(
  "/google-oauth",
  passport.authenticate("google", {
    scope: ["openid", "email", "profile"]
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect(requestOrigin);
  }
);

authRouter.get("/unsuccessful", (req, res) =>
  res.send("redirect unsuccessful")
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(requestOrigin);
});

module.exports = authRouter;
