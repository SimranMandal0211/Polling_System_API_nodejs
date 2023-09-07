const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Port = 1024;

app.use(bodyParser.urlencoded({extended: true}))

// database
const db = require('./config/mongoose');

// routes
app.use('/', require('./routes'));


app.listen(Port, (err) => {
    if(err){
        console.log('app listen error::', err);
    }
    console.log('Server is running on port', Port);
})