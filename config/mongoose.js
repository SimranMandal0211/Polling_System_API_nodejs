require('dotenv').config();
const mongoose = require('mongoose');

const connectParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(process.env.DB_URL, connectParams);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to database'));

db.once('open', () => {
    console.log("Successfully connected to database: MongoDB");
});

module.exports = mongoose;