const express = require('express');
const bodyParser = require('body-parser');
// Require  routes
const studentroutes= require('./src/routes/student.route')
const enseignantRoute= require('./src/routes/enseignantRoute')


// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;
const hostname = '127.0.1.1';

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// using as middleware
app.use(studentroutes)
app.use(enseignantRoute)


// listen for requests
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});