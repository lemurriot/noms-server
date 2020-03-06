const express = require("express");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonBodyParser = express.json();

// usersRouter
//   .get("/")

usersRouter
  .route("/change-name")
  .put(jsonBodyParser, async (req, res, next) => {
    const userNameExists = await UsersService.checkUserNameExists(
      req.app.get("db"),
      req.body.username
    );
    if (userNameExists) {
      res.status(404).json({
        error: "Username is already taken"
      });
    }

    UsersService.changeUsername(
      req.app.get("db"),
      req.body.email,
      req.body.username
    )
      .then(user => {
        res.status(204).json(user);
      })
      .catch(next);
  });

module.exports = usersRouter;
