const express = require("express");
const autocompleteService = require("./autocomplete-service");

const autocompleteRouter = express.Router();

autocompleteRouter.route("/:querystring").get((req, res) => {
  autocompleteService
    .fetchResults(
      req.params.querystring
      // TO DO reconfig for sessionToken from frontend
      // TO DO filter out non-restaurants in frontend
      // req.body.sessionToken
    )
    .then(response => response.json())
    .then(response => res.send(response))
    // TO DO flesh out error handling
    .catch(
      res.status(401).json({
        message: "Could not fetch data"
      })
    );
});

module.exports = autocompleteRouter;
