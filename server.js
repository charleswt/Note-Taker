const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/index.js'); // Import the routes
// Port number
const PORT = 3001;
// Creates instance of express allowing us to create routes add mmiddleware etc.
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply middleware /api
app.use('/api', apiRoutes);

// Static files from 'public' directory
app.use(express.static('public'));

// GET GET route / for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route /note for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// Gives express a port to listen on
app.listen(PORT, () =>
  console.log('App listening at http://localhost:'+PORT)
);