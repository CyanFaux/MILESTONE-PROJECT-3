# MP3 "MovieMind"
Nichole, Nathan, Josh, Andrew


## Movie review app
This App's framework is based on the Rest-Rant App, refactored and repurposed for our needs, utilizing AI tools. It's intended to be a place to write and post reviews on a variety of movies, pulled from the omdb api @ http://www.omdbapi.com/


## Style UI
 - Brain theme
 - "Mindblown" and "Brainrot"


## Instructions
To run the application locally, change to client folder. Then run 'npm install'. Add a .env folder and specify PORT, DB_URI, DB_NAME, DB_PASSWORD. Then run 'nodemon'.


## API Changelog
 - Included API in fetch request
 - Retrieving/viewing API data WIP 6/9/2024
 - Data retrieval success 6/9/2024


## Current Errors
 - Uncaught TypeError: react__WEBPACK_IMPORTED_MODULE_0__.useContext(...) is undefined
    Navigation Navigation.js:27
    React 11
    workLoop scheduler.development.js:266
    flushWork scheduler.development.js:239
    performWorkUntilDeadline scheduler.development.js:533
    js scheduler.development.js:571
    js scheduler.development.js:633
    factory react refresh:6
    Webpack 24
### Navigation.js:27

 - Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
RenderedRoute@http://localhost:3000/static/js/bundle.js:40841:7
Routes@http://localhost:3000/static/js/bundle.js:41531:7
Router@http://localhost:3000/static/js/bundle.js:41470:7
BrowserRouter@http://localhost:3000/static/js/bundle.js:39420:7
CurrentUserProvider@http://localhost:3000/static/js/bundle.js:859:29
div
### App react-dom.development.js:86

 - Uncaught TypeError: react__WEBPACK_IMPORTED_MODULE_0__.useContext(...) is undefined
    Navigation Navigation.js:27
    React 12
    workLoop scheduler.development.js:266
    flushWork scheduler.development.js:239
    performWorkUntilDeadline scheduler.development.js:533
    js scheduler.development.js:571
    js scheduler.development.js:633
    factory react refresh:6
    Webpack 24
### Navigation.js:27

 - The above error occurred in the <Navigation> component:

Navigation@http://localhost:3000/static/js/bundle.js:579:89
Router@http://localhost:3000/static/js/bundle.js:41470:7
BrowserRouter@http://localhost:3000/static/js/bundle.js:39420:7
CurrentUserProvider@http://localhost:3000/static/js/bundle.js:859:29
div
### App

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries. react-dom.development.js:18704


# Parts:


## Frontend API with Express and Node.js
 - Express server
 - CRUD routes
 - Sequelize to interact with db


## PostgreSQL Database
 - Movies table
    - imdb_id, integer, not null, primary key
    - movie_title, varchar
 - Reviews table
    - review_id, integer, not null, primary key
    - user_id, integer, not null, unique, foreign key/users table
    - imbd_id, integer, not null, unique, foreign key/movies table
    - review_rating, boolean, not null, default true
    - review_text, varchar, 200
 - Users table
    - user_id, integer, not null, primary key
    - username, varchar, 50, not null
    - email, varchar, 100, not null
    - password, varchar, 255, not null