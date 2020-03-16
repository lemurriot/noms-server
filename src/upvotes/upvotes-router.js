const express = require("express");
const UpvotesService = require("./upvotes-service");

const upvotesRouter = express.Router();
const jsonBodyParser = express.json();

upvotesRouter
  .route("/")
  .all(jsonBodyParser, (req, res, next) => {
    UpvotesService.getUserDidUpvoteRestaurant(
      req.app.get("db"),
      req.body.userId,
      req.body.restaurantId
    ).then(upvoteId => {
      res.upvoteId = upvoteId;
      next();
    });
  })
  .put(jsonBodyParser, (req, res) => {
    if (res.upvoteId.length) {
      res.status(400).json({
        error: "Users can only upvote once per restaurant"
      });
    } else {
      UpvotesService.insertNewUpvote(
        req.app.get("db"),
        req.body.userId,
        req.body.restaurantId
      ).then(newUpvoteObject => {
        res.status(201).json({
          newUpvoteObject
        });
      });
    }
  })
  .delete((req, res) => {
    if (!res.upvoteId.length) {
      res.status(400).json({
        error: "User has not already upvoted this restaurant"
      });
    } else {
      const { id } = res.upvoteId[0];
      UpvotesService.deleteUpvote(req.app.get("db"), id).then(() => {
        res.status(201).json({ message: `${id} deleted` });
      });
    }
  });

module.exports = upvotesRouter;
