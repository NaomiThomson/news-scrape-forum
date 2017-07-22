// library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// local imports
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {rez} = require('./scrape');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


console.log(rez);

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
});

// deletes user
app.delete('/users/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }; 

  User.findByIdAndRemove(id).then((user) => {
    if (!user) {
      return res.status(404).send()
    }

    res.send(user);
  }).catch((e) => {
    res.status(400).send();
  })
});

// update user
app.patch('/users/:id', (req, res) => {
  var id = req.params.id;
  
  // only pull off properties that users update
  var body = _.pick(req.body, ['email']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }; 

  // if (body.completed) {
  //   return res.status(200).send('do something with this')
  // }

  User.findByIdAndUpdate(id, {$set: body}, {new: true})
  .then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send({user});
  }).catch((e) => {
    res.status(400).send();
  })

  // example for completed at 
  // if (_.isBoolean(body.completed) && body.completed) {
  //   body.completedAt = new Date().getTime();
  // } else {
  //   body.completed = false;
  //   body.completedAt = null;
  // }

});

app.listen(port, () => {
  console.log(`started up at port ${port}`);
});
