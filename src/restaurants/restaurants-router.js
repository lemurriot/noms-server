const express = require('express')
const RestaurantsService = require('./restaurants-service')

const restaurantsRouter = express.Router()

restaurantsRouter
    .route('/')
    .get((req, res, next) => {
      RestaurantsService.getAllRestaurants(req.app.get('db'))
        .then(restaurants => {
            res.json(restaurants.map(RestaurantsService.serializeRestaurant))
        })
        .catch(next)
    })


module.exports = restaurantsRouter