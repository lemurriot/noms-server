# Noms Server!

Express server for CRUD web app

## Set up

1. Install dependencies with `npm install`
2. Create postgresql database 'noms' - adjust user and other variables in src/config.js as necessary
3. With the Postgres server running, to migrate the db, run `npm run migrate`
4. To seed the db with dummy data, run psql `psql -U username -d noms -f seeds/seed.noms_tables.sql` from the root directory
5. Run nodemon with `npm run dev`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.