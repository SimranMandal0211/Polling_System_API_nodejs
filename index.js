const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const app = express();
const Port = process.env.PORT || 1024;


app.use(bodyParser.urlencoded({extended: true}))

// database
const db = require('./config/mongoose');

// routes
app.use('/', require('./routes/index'));


app.listen(Port, (err) => {
    if(err){
        console.log('app listen error::', err);
    }
    console.log('Server is running on port', Port);
})