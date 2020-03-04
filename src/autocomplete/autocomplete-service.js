const { uuid } = require("uuidv4");
const keys = require("../config/keys");
const fetch = require("node-fetch");
// const Client = require("@googlemaps/google-maps-services-js").Client;

// const client = new Client({});

// client
//   .elevation({
//     params: {
//       locations: [{ lat: 45, lng: -110 }],
//       key: keys.google.placesAPIKey
//     },
//     timeout: 1000 // milliseconds
//   })
//   .then(r => {
//     console.log(r.data.results[0].elevation);
//   })
//   .catch(e => {
//     console.log(e);
//   });
const autocompleteService = {
  async fetchResults(query, sessionToken = uuid()) {
    console.log(query, "!");
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=establishment&location=45.5230,-122.6675&radius=8000&strictbounds&offset=3&key=${keys.google.placesAPIKey}&sessiontoken=${sessionToken}`;

    const data = await fetch(url);
    // console.log(data)

    return data;
  }
};

module.exports = autocompleteService;
