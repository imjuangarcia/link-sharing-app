// Load dependencies
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuidv4 = require('uuid/v4');

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

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

// upload functionality
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'links',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key(request, file, cb) {
      cb(null, uuidv4());
    },
  }),
}).array('upload', 1);

app.post('/upload', (request, response) => {
  upload(request, response, (error) => {
    if (error) {
      return response.redirect('/error');
    }
    return response.redirect('/success');
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
