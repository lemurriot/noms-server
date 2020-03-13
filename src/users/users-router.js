const express = require("express");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.route("/").get((req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.send({});
  }
});

usersRouter
  .route("/edit-username")
  .put(jsonBodyParser, async (req, res, next) => {
    const userNameExists = await UsersService.checkUserNameExists(
      req.app.get("db"),
      req.body.new_username
    );
    if (userNameExists.length) {
      res.status(404).json({
        error: "Username is already taken"
      });
    } else {
      UsersService.changeUsername(
        req.app.get("db"),
        req.body.email,
        req.body.new_username
      )
        .then(user => {
          res.status(204).json(user);
        })
        .catch(next);
    }
  });

module.exports = usersRouter;
