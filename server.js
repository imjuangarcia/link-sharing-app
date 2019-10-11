// Load dependencies
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();

// Views in public directory
app.use(express.static('public'));

// Main, error and success views
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/public/index.html`);
});

app.get('/success', (request, response) => {
  response.sendFile(`${__dirname}/public/success.html`);
});

app.get('/error', (request, response) => {
  response.sendFile(`${__dirname}/public/error.html`);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
