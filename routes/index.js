const app = require('express').Router();
const fb = require('./feedback');

// Add /notes prefix for the feedback router
app.use('/notes', fb);

module.exports = app;