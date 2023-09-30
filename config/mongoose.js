const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/Polling_System_API');

const connectParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

// code for manually using the mongodb of local system
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to database'));

db.once('open', () => {
    console.log("Successfully connected to database: MongoDB");
});

module.exports = mongoose;