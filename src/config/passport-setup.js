const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const AuthService = require("../auth/auth-service");

const knexConfig = require("../knexfile");

const knex = require("knex");

const db = knex(knexConfig);
passport.initialize();
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/api/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Connecting to Google...");
      AuthService.findUserById(db, profile.id).then(usr => {
        if (usr) return done(null, usr);
        AuthService.createUser(db, profile).then(newUsr => done(null, newUsr));
      });
    }
  )
);
