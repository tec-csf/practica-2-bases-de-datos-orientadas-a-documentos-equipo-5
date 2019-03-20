// Make the comunication with a server to create petitions
const express = require('express');
// Make the paths for the paths to create the petitions
const path = require('path');
// Parses the information in the body of petitions
const bodyParser = require('body-parser');
// Cross-Origin Resource Sharing needed for express to get headers
const cors = require('cors');
// Strategy for authenticating with a JSON Web Token.
const passport = require('passport');
// MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');
// Configuration of the database
const config = require('./config/database');

// Connect to the database
mongoose.connect(config.database, {
  useNewUrlParser: true
});

// Connect to the database and log out if it was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to the database ' + config.database);
});

// Logout if the connect was failed
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// Initialize Express
const app = express();

// Create the routing for the petitions in users URL
const users = require('./routes/users');
const ingresos = require('./routes/ingresos');
const egresos = require('./routes/egresos');

// Set the port that you want to start the service app
const port = 3000;

// CORS Middleware added to express
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Passport strategy for authenticating with a JSON Web Token.
app.use(passport.initialize());
app.use(passport.session());

// Get the code of the settings for the passport
require('./config/passport')(passport);

// Use users as the domain to make the petitions
app.use('/users', users);
app.use('/egresos', egresos);
app.use('/ingresos', ingresos);

// Index Route / show as invalid end point
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server on the port setted
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
