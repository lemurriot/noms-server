const xss = require("xss");

const UsersService = {
  getUserInfo(db, userId) {
    return db
      .select("*")
      .from("users")
      .where("id", userId);
  },
  checkUserNameExists(db, username) {
    return db
      .select("user_name")
      .from("users")
      .where("user_name", username);
  },
  changeUsername(db, userId, newUsername) {
    return db
      .returning("user_name")
      .update("user_name", xss(newUsername))
      .into("users")
      .where("id", userId);
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
