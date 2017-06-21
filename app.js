const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/testaroo');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// Initialise route
app.use('/api',require('./routes/api'));

// Error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({
    error: err.message
  });
});

app.get('/',function(req,res){
  res.end()

});








// listen for requests
app.listen(process.env.port || 4000,function(){   // process.env.port : port variable in heroku
  console.log('Now listening for requests! ');
});
