const express = require("express");
const autocompleteService = require("./autocomplete-service");

const autocompleteRouter = express.Router();
const jsonBodyParser = express.json();

autocompleteRouter.route("/:querystring").get((req, res) => {
  autocompleteService
    .fetchResults(
      req.params.querystring
      // TO DO reconfig for sessionToken from front end
      // req.body.sessionToken
    )
    .then(response => response.json())
    .then(response => res.send(response));
});

module.exports = autocompleteRouter;
