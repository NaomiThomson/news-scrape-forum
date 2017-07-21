// library imports
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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
  User.find().then((users) => {
    res.send({users})
  }, (e) => {
    res.status(400).send(e);
  })
});

// returns specific user
app.get('/users/:id', (req, res) => {
  var id = req.params.id;
  
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }; 

  User.findById(id).then((user) => {
    if(!user) {
      return res.status(404).send();
    };

    res.send({user});

  }).catch((e) => {
    res.status(400).send();
  })


})

app.listen(3000, () => {
  console.log('started on port 3000')
});
