require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const { NODE_ENV } = require("./config");
const keys = require("./config/keys");
require("./config/passport-setup");

const autocompleteRouter = require("./autocomplete/autocomplete-router");
const restaurantsRouter = require("./restaurants/restaurants-router");
const commentsRouter = require("./comments/comments-router");
const upvotesRouter = require("./upvotes/upvotes-router");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://www.nomspdx.com",
      "https://nomspdx.com"
    ]
  })
);

app.use(cookieParser(keys.session.cookieKey));
const cookieSessionConfig = {
  sameSite: "none",
  httpOnly: false,
  // 4 hour sessions
  maxAge: 4 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
};
if (NODE_ENV === "production") {
  app.set("trust proxy", 1);
  cookieSessionConfig.secure = true;
}
app.use(cookieSession(cookieSessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/search", autocompleteRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/upvotes", upvotesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.get("/", (_req, res) => {
  res.send("hello world");
});

// eslint-disable-next-line prefer-arrow-callback
app.use(function errorHandler(error, _req, res, _next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
