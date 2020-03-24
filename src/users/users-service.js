const xss = require("xss");

const UsersService = {
  checkUserNameExists(db, username) {
    return db
      .select("user_name")
      .from("users")
      .where("user_name", username);
  },
  changeUsername(db, userEmail, newUsername) {
    return db
      .returning("user_name")
      .update("user_name", xss(newUsername))
      .into("users")
      .where("email", userEmail);
  },
  getHighestId(db) {
    return db
      .select("id")
      .from("users")
      .orderBy("id", "desc")
      .limit(1);
  }
};

module.exports = UsersService;
