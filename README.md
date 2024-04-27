# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

# Welcome to Project1!

### TASK 1

To successfully connect to the two databases locally, follow these steps:

1. Create 2 .env file in the root directory of the project
2. write PGDATABASE=
3. Add the name of the database ( you can find them in db/seeds/setup.sql)

example:

PGDATABASE=this_is_an_example

### TASK 2

1. Create a GET /api/topics endpoint
2. Responds with an array of topic objects, with slug and description properties
3. Deal with the 404 Error

### TASK 3

1. Create a GET /api endpoint
2. Responds with an object describing all the available endpoints on your API
3. Use TDD and also test for any error

### TASK 4

1. Create a GET /api/articles/:article_id endpoind
2. Responds with an object of the selected article endPoint
3. Deal with errors that this endPoint can cause

### TASK 5

1. Create a GET /api/articles endpoint
2. Responds with an array of article objects with the associated properties
3. Consider what errors could occur with this endpoint, and make sure to test for them

### TASK 6

1. GET /api/articles/:article_id/comments endpoint
2. Responds with an array of comments for the given article_id of which each comment should have the associated properties
3. Consider and test for any error

### TASK 7

1. POST /api/articles/:article_id/comments
2. Add a comment for an article
3. Responds with the posted comment

### TASK 8

1. PATCH /api/articles/:article_id Should be available on /api/articles
:article_id
2. Update an article by article_id
3. Deal with errors

### TASK 9

1. CORE: DELETE /api/comments/:comment_id
2. Delete the given comment by comment_id
3. Deal with errors

### TASK 10

1. GET /api/users
2. Responds with an array of objects with the assosiated properties
3. Consider what errors could occur with this endpoint
