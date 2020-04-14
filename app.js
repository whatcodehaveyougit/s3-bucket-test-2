
const express = require('express');
const aws = require('aws-sdk');

/*
 * Set-up and run the Express app.
 */
const app = express();
app.set('views', './views');
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3000);

/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = 'eu-west-2';

/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET;

/*
 * Respond to GET requests to /account.
 * Upon request, render the 'account.html' web page in views/ directory.
 */
app.get('/account', (req, res) => res.render('account.html'));

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */
app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
});



















































// const express = require('express')
// const app = express()
// const port = process.env.PORT || 3000;

// const aws = require('aws-sdk');

// var path = require("path");
// const dotenv = require('dotenv');
// dotenv.config();


// app.set('views', './views');
// app.use(express.static('./public'));
// app.engine('html', require('ejs').renderFile);
// app.listen(process.env.PORT || 3000);
// aws.config.region = 'eu-west-2';

// const S3_BUCKET = process.env.S3_BUCKET;

// // app.get('/', (req, res) => res.send('Hello World!'))

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// console.log(`${process.env.AWS_ACCESS_KEY_ID}`)


// app.get('/account', (req, res) => res.render('account.html'));

// app.get('/sign-s3', (req, res) => {
//   const s3 = new aws.S3();
//   const fileName = req.query['file-name'];
//   const fileType = req.query['file-type'];
//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName,
//     Expires: 60,
//     ContentType: fileType,
//     ACL: 'public-read'
//   };

//   s3.getSignedUrl('putObject', s3Params, (err, data) => {
//     if(err){
//       console.log(err);
//       return res.end();
//     }
//     const returnData = {
//       signedRequest: data,
//       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
//     };
//     res.write(JSON.stringify(returnData));
//     res.end();
//   });
// });

// app.post('/save-details', (req, res) => {
// 	console.log("hello world working?")
// });




