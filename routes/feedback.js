const fb = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const { uuid } = require('uuidv4'); // Import uuid from uuidv4 package

// Helper function to read from a file and return a promise
const readFromFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    readFromFile(filePath)
      .then((data) => resolve(JSON.parse(data)))
      .catch((error) => reject(error));
  });
};

// Helper function to append data to a file and return a promise
const readAndAppendAsync = (data, filePath) => {
  return new Promise((resolve, reject) => {
    readAndAppend(data, filePath)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

// GET Route for retrieving all the feedback
fb.get('/', async (req, res) => {
  console.log('Get request received');

  try {
    const data = await readFromFileAsync('./db/db.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST Route for submitting feedback
fb.post('/', async (req, res) => {
  console.log('Post request received');

  const { title, text } = req.body;

  if (title && text) {
    const newFeedback = {
      title,
      text,
      id: uuid(),
    };

    try {
      await readAndAppendAsync(newFeedback, './db/db.json');
      const response = {
        status: 'success',
        body: newFeedback,
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete Route for deleting notes
fb.delete('/:id', (req, res) => {
  readAndDelete(req.params.id, './db/db.json');
  res.json('DELETE Request Called');
});

module.exports = fb;