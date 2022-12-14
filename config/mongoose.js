// To connection Node.js with MongoDB, we have to require the library called mongoose
const mongoose = require('mongoose');

// To connect with your database
const database_name = process.env.DATABASE_NAME;
mongoose.connect(`mongodb://127.0.0.1:27017/${database_name}`);

// Now let's Check if MongoDB connects with Node.js or not
const db = mongoose.connection;

// If any connection error
db.on('error', console.error.bind(console, 'Database Connection Error :('));
// If Database connection happens
db.once('open', ()=>{
    console.log("Database connection successful");
});

module.exports = db;

