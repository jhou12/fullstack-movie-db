# Blank Canvas Fullstack App🎨

I built this template to expedite the refactoring of my projects. Made using the MERN/SERN stack, React hooks, and styled-components. Once installed, the app displays an array of seeded data from the database of choice, received from a GET request to the server on page load.

<p align="center">
<img src="screenshot.png" width="215"/>
</p>

## Fullstack Setup:

1. `git clone`
1. optional: remove unused database from `package.json`
1. install dependencies with `npm install`
1. add `.env` file to root directory with credentials (or copy .env format from `reference/env format.txt`), then seed database with `npm run seed-mysql` or `npm run seed-mongo`
1. un-comment database of choice in `server/index.js` and start server with `npm run start`
1. build bundle with `npm run build`
1. verify app is now running by checking for a list of data on `localhost:3000`
1. for development, start webpack with `npm run react-dev`

## Front-End Setup Only:

1. `git clone`
1. optional: remove `mongoose`, `mysql`, `mysql2`, and `sequelize` from dependencies, delete `database` directory, and in `server/index.js` delete `db` imports and `app.get()` endpoint
1. install dependencies with `npm install`
1. start server with `npm run start`
1. build bundle with `npm run build`
1. verify app is now running by checking for a list of data on `localhost:3000`
1. for development, start webpack with `npm run react-dev`
