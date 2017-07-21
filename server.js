// library imports
var express = require('express');
var bodyParser = require('body-parser');

// local imports
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// creates new user
app.post('/users', (req, res) => {
  var user = new User({
    email: req.body.email
  });

  user.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  })
});

// returns users
app.get('/users', (req, res) => {
  
})

app.listen(3000, () => {
  console.log('started on port 3000')
});
