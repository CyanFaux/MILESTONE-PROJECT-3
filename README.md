# MP3 "MovieMind"
Nichole, Nathan, Josh, Andrew


## Movie review app
This App's framework is based on the Rest-Rant App, refactored and repurposed for our needs, utilizing AI tools. It's intended to be a place to write and post reviews on a variety of movies pulled from the omdb api 
@http://www.omdbapi.com/


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
 - 


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