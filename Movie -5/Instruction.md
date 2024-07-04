# Movie API Project Instructions

## **Total Marks: 10**

### Running the Server

1. Start the server on **PORT 8090**. Ensure strict adherence to this port number.

<!-- Overview -->

## Project Overview

You are tasked with building an API for a movie database. The project should include the following features:

## you node express mongodb

### Authentication

Implement user registration (sign-up) and login functionality. Users should have the ability to create accounts and log in.

```js
### Movie CRUD Operations
Create an API for managing movies. This should include:

- Adding a new movie to the database,
- Retrieving a list of all movies.
- Retrieving a specific movie by its ID.
- Updating movie details.
- Deleting a movie.
```

## Follow these instructions strictly

<!-- Steps  -->

## Implement in MVC Structure

<!--database connection  -->

1. Create a 'config' folder. Inside this folder, create a file named 'db.js'. Write logic to connect to MongoDB using an online database such as MongoDB Atlas.

<!-- Database Schema Design -->

# User Schema Design

2. Create a 'Models' folder.
   - Inside this folder, create a file named 'user.schema.js' with the following schema:

```js
({
  username,
  password,
  email,
});
```

# Movie Schema Design

3. Create a new file inside the 'Models' folder named 'movie.schema.js':

```js
({
  title,
  description,
  releaseDate,
  category,
  image,
  addedBy: String,
  actors: [{ name: String }],
  ratings: [{ value: Number }],
  comments: [{ text: String }],
});
```

<!-- Routes -->

<!-- make base api end point -->

# make a get route `/` res.send("Welcome to the movie API")

# Make folders 'Routes', 'controllers', and 'middlewares

- check only tile

## Inside the 'Routes' folder, create a file named 'user.route.js'

### Implement routes for user

<!-- Post -->

## Implement a post route named `/user/signup`

- Logic in 'user.controller.js' to handle user data and save it into the database.
- After adding to the database, send the added user data in the response with status(201)

## delete route `/user/delete/:id` send({'message', 'User deleted successfully'})

 <!-- Middleware user.middleware.js -->

- Implement middleware to handle missing data errors (status 400) with `{error: "all fields are required"}`.

<!-- Login route -->

## Implement a login post route named ` /user/login`

- Receive email and password.
- Check if email and password match in the database, then send a response `{message, 'Logged in successfully'}`.
- if email or password wrong then send res.status(401).json({error:"Invalid email or password"})

<!-- Middleware user.middleware.js -->

- While logging in, handle missing data errors with `status (400)` and `{error: "all fields are required"}`.

<!-- Get -->

## Implement a get route named `/user/` to send all user data.

## Implement a post route `/movie/create`

- Add a new movie record to the database.
- do not create rating and comments
- send added movie data with `status(201)`

<!-- Middleware -->

- If any data is missing, send an error `status (400)` and `{error: "all fields are required"}`.
- check only title category addedBy releaseDate

## Implement a patch request with ID `/movie/update/:id`

- Update movie details by passing the ID.
- Send updated movie data with `status(200)`.

## Implement a delete route `/movie/delete/:id`

- send {"message", "Movie deleted"}

### Movie Rating

1. Establish a PATCH route named `/movie/rating/:id`.
   - Provide the movie ID.
   - Retrieve the rating data from the request body (e.g., `let {rating} = req.body`).
   - If the movie is not found, send an error: `{error: "movie not found}"`.
   - Add the rating to the movie's rating database (ranging from 0 to 10) and send the updated movie in object.

### Movie Comment

1. Create a PATCH route named `/movie/comment/:id`.
   - Include the movie ID.
     Retrieve the comment data from the request body (e.g., `let {text} = req.body`).
   - If the movie is not found, send an error: `{error: "movie not found}"`.
   - Add the comment to the movie's database and send the updated movie in object.

<!-- search and filter -->

## Implement a get route named `/movie/filter`

- receive query parameters
- receive title, addedBy, releaseDate ,category
- if you receive any query send data like this

<!-- get movies -->

## make a get api `/movie/list`

- send list of movies
<!-- render -->

## Implement a get route named `/movie/movies`

- set up ejs
- show all data in the ui
- show movie image in img tag `class=img`
- title in p tag `class="title"`
- addedBy in span `class= author`
- release date in span `class=date`
- append into the div give `class =list`

```js


## Testing Your Score
1. Navigate to the 'test' directory using `cd test`.
2. Run 'npm i' to install dependencies. If you encounter any errors during installation, you can use the following command: `./node_modules/.bin/cypress install`.
3. Run tests using either `npx cypress open` or `npx cypress run`.

**Best of Luck!**
```
