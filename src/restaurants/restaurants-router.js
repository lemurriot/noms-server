const express = require("express");
const RestaurantsService = require("./restaurants-service");

const restaurantsRouter = express.Router();

restaurantsRouter.route("/").get((req, res, next) => {
  RestaurantsService.getAllRestaurants(req.app.get("db"))
    .then(restaurants => {
      res.json(restaurants.map(RestaurantsService.serializeRestaurant));
    })
    .catch(next);
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
      console.log(res.restaurant);
      res.json(
        RestaurantsService.serializeRestaurantUsersAndComments(res.restaurant)
      );
      // res.json(RestaurantsService.serializeRestaurant(res.restaurant))
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
