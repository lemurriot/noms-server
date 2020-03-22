const bcrypt = require("bcrypt");

const saltRounds = 10;

var salt = bcrypt.genSaltSync(saltRounds);
const hash = syntheticGooglePassword =>
  bcrypt.hashSync(syntheticGooglePassword, salt);

const AuthService = {
  findUserById(db, profileId) {
    console.log("Finding user...");
    return db
      .select("id", "email", "user_name")
      .from("users")
      .where({ googleid: profileId })
      .first();
  },
  createUser(db, profile) {
    console.log("Creating user...");
    // TO DO account for displayName equalling already existing one
    return db("users")
      .returning(["id", "email", "user_name"])
      .insert({
        user_name: profile.displayName,
        email: profile.emails[0].value,
        password: hash(profile.id),
        googleid: profile.id
      });
  }
};

module.exports = AuthService;
