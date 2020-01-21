const app = require("./app");
const knexConfig = require("./knexfile");
const knex = require("knex");

const { PORT } = require("./config");

const db = knex(knexConfig);

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
