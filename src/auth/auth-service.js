const bcrypt = require("bcrypt");
const saltRounds = 10;

var salt = bcrypt.genSaltSync(saltRounds);
const hash = syntheticGooglePassword =>
  bcrypt.hashSync(syntheticGooglePassword, salt);

const AuthService = {
  findUserById(db, profileId) {
    console.log("Finding user...");
    return db
      .select("*")
      .from("users")
      .where({ googleid: profileId })
      .first();
  },
  createUser(db, profile) {
    console.log("Creating user...");
    // hashSyntheticGooglePassword("hello").then(hash => console.log("hello", hash))
    return db("users").insert({
      user_name: profile.displayName,
      email: profile.emails[0].value,
      password: hash(profile.id),
      googleid: profile.id
    });
  }
};

module.exports = AuthService;
