const { uuid } = require("uuidv4");
const keys = require("../config/keys");
const fetch = require("node-fetch");

const autocompleteService = {
  async fetchResults(query, sessionToken = uuid()) {
    console.log(query, "!");
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(
      query
    )}&types=establishment&location=45.5230,-122.6675&radius=8000&strictbounds&offset=3&key=${
      keys.google.placesAPIKey
    }&sessiontoken=${sessionToken}`;

    const data = await fetch(url);

    return data;
  }
};

module.exports = autocompleteService;
