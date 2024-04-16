# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

# Welcome to the Project1!

To successfully connect to the two databases locally, follow these steps:

1. Create 2 .env file in the root directory of the project.
2. write PGDATABASE=
3. Add the name of the database ( you can find them in db/seeds/setup.sql)

example: 

PGDATABASE=this_is_an_example

### TASK 2

1.Create a GET /api/topics endpoint
2.Responds with an array of topic objects, with slug and description properties
3.Deal with the 404 Error


### TASK 3

1.Create a GET /api endpoint 
2.Respond with an object describing all the available endpoints on your API
3.Use TDD and also test for any error 

### TASK 4

1.Create a GET /api/articles/:article_id endpoind
2.Respond with an object of the selected article endPoind
3. Deal with errors that this endPoint can cause