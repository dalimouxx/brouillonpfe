const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;
const hostname = '127.0.1.1';

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require employee routes
const studentroutes= require('./src/routes/student.route')

// using as middleware
app.use('/api/v1/student',studentroutes)

// listen for requests
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});