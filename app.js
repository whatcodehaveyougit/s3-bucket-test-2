const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const aws = require('aws-sdk');

var path = require("path");
const dotenv = require('dotenv');
dotenv.config();


app.set('views', './views');
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3000);
aws.config.region = 'eu-west-2';

const S3_BUCKET = process.env.S3_BUCKET;

// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

console.log(`${process.env.AWS_ACCESS_KEY_ID}`)


app.get('/account', (req, res) => res.render('account.html'));

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

app.post('/save-details', (req, res) => {
	console.log("hello world working?")
});




