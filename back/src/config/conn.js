const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.MONGODB_USERNAME; 
const password = process.env.MONGODB_PASSWORD;  
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DATABASE;

// const mongoURI = `mongodb://${host}:${port}/${database}`;
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.v0nts.mongodb.net/${database}`;

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;