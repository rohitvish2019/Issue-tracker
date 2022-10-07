//Creating DB connections

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/issue_tracker');
let db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to DB "));
db.once('open', function(){
    console.log("Connected to DB");
});

module.exports = db;