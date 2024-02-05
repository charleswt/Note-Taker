const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = async (destination, content) => {
  try {
    await fs.promises.writeFile(destination, JSON.stringify(content, null, 4));
    console.info(`\nData written to ${destination}`);
  } catch (err) {
    console.error(err);
  }
};

const readAndAppend = async (content, file) => {
  try {
    const data = await readFromFile(file);
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error(err);
  }
};

const readAndDelete = async (id, file) => {
  try {
    const data = await readFromFile(file);
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex((note) => note.id === id);
    parsedData.splice(index, 1);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };