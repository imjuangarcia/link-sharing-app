// Load dependencies
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Initialize the app
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

// Declare filename variable to store the name + extension
let filename;

// Code to run when form is submitted
app.post('/links/*', (request, response) => {
  // Multer upload
  const upload = multer({
    storage: multerS3({
      s3,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      bucket: request.url.slice(1),
      key(req, file, cb) {
        // Create date variable for timestamp
        const date = Date.now().toString();
        // Reassign the variable with the full file name (name + extension)
        filename = date + path.extname(file.originalname);
        cb(null, filename);
      },
    }),
  }).array('upload', 1);

  // Run the upload function
  upload(request, response, (error) => {
    if (error) {
      return response.redirect('/error');
    }
    return response.redirect(`/success?file=#${request.url}/${filename}`);
  });
});

// Port to listen to
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
