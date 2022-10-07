const express = require('express');
const app = express();
const port = 80;

//Mongoose for interacting with DB
const mongoose = require('./config/mongoose')

//Layouts for partials
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const { urlencoded } = require('express');



app.set('views', './views')
app.set('view engine', 'ejs')

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('./assets'));
//for parsing form data
app.use(urlencoded());
app.use('/', require('./routes/index'))
app.listen(port, function(err){
    if(err){
        console.log("Error starting server "+err);
    }else{
        console.log("Issue tracker started on port "+port);
    }
})