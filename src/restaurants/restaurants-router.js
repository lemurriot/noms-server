const express = require("express");
const path = require("path");
const RestaurantsService = require("./restaurants-service");

const restaurantsRouter = express.Router();
jsonBodyParser = express.json();

restaurantsRouter
  .route("/")
  .get((req, res, next) => {
    RestaurantsService.getAllRestaurants(req.app.get("db"))
      .then(restaurants => {
        res.json(restaurants.map(RestaurantsService.serializeRestaurant));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    // TO DO require auth
    // TO DO post comment
    const { restaurant_name, comment = "" } = req.body;
    const newNom = { restaurant_name, comment };
    if (!restaurant_name)
      return res.status(400).json({
        error: `Missing restaurant_name in request body`
      });
    // newNom.user_id = req.user.id
    //Auth needed
    newNom.user_id = Math.floor(Math.random() * 100) + 1;

    //TO DO write RestaurantService.insertNewNomination
    RestaurantsService.postNewRestaurant(req.app.get("db"), newNom);
    res.end();
  });

restaurantsRouter
  .route("/:restaurant_id")
  .all(checkRestaurantExists)
  .get((req, res) => {
    RestaurantsService.getCommentsAndUsers(
      req.app.get("db"),
      req.params.restaurant_id
    ).then(comments => {
      res.restaurant.comments = comments;
      res.json(
        RestaurantsService.serializeRestaurantUsersAndComments(res.restaurant)
      );
    });
  });

async function checkRestaurantExists(req, res, next) {
  try {
    const restaurant = await RestaurantsService.getRestaurantById(
      req.app.get("db"),
      req.params.restaurant_id
    );
    if (!restaurant)
      return res.status(404).json({
        error: `Restaurant does not exist`
      });

    res.restaurant = restaurant;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = restaurantsRouter;
