-  Install nodemon and update scripts inside package.json
-  what are dependecies
-  what is the use of "-g" while npm install
-  difference between caret and tilde (^ vs ~)
-  order of routes matter a lot
-  write logic to handle GET, POST, PATCH, DELETE api calls and test them on postman
-  explore routing and use of ?, +, (), "\*" in the routes
-  use of regex in routes /a/, "/.\*hi$/"
-  reading the query params in the routes
-  reading the dynamic routes

-  multiple route handlers
-  next()
-  next function and erros along with res.send()
-  app.use('/route',rH,[rH2,rH3],rH4,rH5) : enclosing them in array will not affect anything & it will work similar to (app.use('/route',rH,rH2,rH3,rH4,rH5))
-  What is middleware? why do we need it?
-  How express JS basically handles requests behind the scenes
-  difference between app.use() and app.all()

-  install mongoose library
-  connect your application to the database "<connection-url>/devTinder"
-  call connectDB function and connect to db before starting listening
-  create user schema and model
-  create POST/signup API to add data to DB
-  Push some documents(object) using API calls from postman
-  Error handling using try, catch to all promises (usually all mongoose function return promises)

-  JSON vs JS object
-  express.json() middleware is used to parse json data to route
-  difference between `PATCH` vs `PUT`

-  Data sanitization & schema validations
-  NEVER TRUST `req.body`
-  Validate data in Sign Up API
-  Install bcrypt package
-  create password hash using bcrypt.hash(password,saltRound)
-  save the use with encrypted password

## Authentication

-  `res.cookie` & `req.cookies`
-  `cookie-parser`
-  `jsonwebtoken`

-  Read documentation for express.Router()

-  Read about Compound index in db
-  read more about indexes in MongoDB
-  why do we need index in DB?
-  what is the advantages and disadvantages of creating?
-  read more about comparision queries
-  linking two schema using "ref"
