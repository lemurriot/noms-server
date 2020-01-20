const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "http://localhost:8000/api/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log(profile);
      console.log("passport cb fired");
      // done()
      // currently console.logs correctly -- TO DO, connect to db for next line to work

      // User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
    }
  )
);
