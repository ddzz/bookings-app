# Bookings App
  * This is a simple app that allows you to create and view bookings. It is built with ReactJS and Ruby on Rails.

## Setting up Rails
  * Note: This app uses the latest version of Ruby on Rails and many gems. If you run into any errors or issues during setup you might need to upgrade your local Ruby version.
  * Clone this repo and `cd` into it.
  * Run `bundle install` to install Rails and other gems.
  * Run `bundle exec rake db:create` to create a local database.
  * Run `bundle exec rake db:migrate` to run database migrations.
  * Run `bundle exec rake db:seed` to seed the database with 100 bookings.
  * Start the Rails server on port `3001` (or any other port you prefer) with `rails s -p 3001`.
    * If you decide to change the port you will need to change it in the React app as well at the top of `/frontend/src/api.js`.

## Setting up React
  * Open a new terminal window and `cd` into the `frontend` directory.
  * Run `yarn install` to install dependencies.
  * Run `yarn start` to start the local React server.
    * Due to CORS issues you might want to access the UI via `127.0.0.1` and not `localhost`.

## Running Tests
  * Rails tests can be run with `bundle exec rspec`.
    * Tests are located in the `/spec/` directory.
  * UI tests can be run with `yarn test`.
    * UI tests are in `/frontend/App.test.js`.

## Notes
  * SQLite is used as the development database while MySQL is used in production.
    * Database configuration can be found in `/config/db.yml`.
    * Database tables are defined in `/db/schema.rb`.
  * Endpoint logic can be found in `/app/controllers/bookings_controller`.
  * Model definitions are in `/app/models/`.
  * For simplicity a single `App` React component is used for the UI.

## Deploy
  * This app has been deployed to Heroku:
    * The UI can be accessed at https://spruce-bookings-ui.herokuapp.com/
    * The backend API is https://spruce-bookings.herokuapp.com/bookings
