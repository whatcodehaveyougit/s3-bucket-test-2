const express = require('express')
const app = express()
const port = 3000

var path = require("path");
const dotenv = require('dotenv');
dotenv.config();

app.get('/', function (req, res) {
    app.get('/', (req, res) => res.send('Hello World!'))
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

console.log(`${process.env.AWS_ACCESS_KEY_ID}`)