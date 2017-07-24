// library imports
const _ = require('lodash');
const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// local imports
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Article} = require('./models/article');


var app = express();
const port = process.env.PORT || 3000;

// Data parsing setup ========================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/*+json" }));

// Static directory ===========================
app.use(express.static(__dirname + '/public'));


// Handlebars setup ============================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes ======================================
// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//scrapeRoute
  //should check for duplicates,
  //mongoose can easily check unique, check for unique titles
  //and it should save to db
// app.get('/scrape-news', (req, res) => {

//   console.log(res.body);

// ); 

// });

//GET data
  //seperate from render GET

//GET route. only purpose is to render 
  //**ur MIGHT need middleware */
  // first, makes call to GET DATA and stores in hbs to be rendered
  //render hbs
  //-----------
  //button to scrape
  //displays data
  //button to save article that makes the POST call below

//POST route that takes {articleId, userId}
  //user should have an array calle "saved"
  //find user doc by id, then push articleId to the array
  


// // // get scraped news and render to home page 
// app.get('/news', (req, res) => {
 
//     // res.render('newsfeed', {news: result});
//     res.render('newsfeed');
// })


// get saved articles and render to bookmarks page 
app.get('/saved-news', (req, res) => {
  //have getNews middleware
  //in getNews, set req.news to the return of GET data route
  //then in here, we set the hbs to req.news
  console.log(res);
  res.send('hi')
});

app.post('/saved-news', (req, res) => {
  res.send(req.body);
  console.log(res);
});


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
    res.send({
      users
    })
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
    if (!user) {
      return res.status(404).send();
    };

    res.send({
      user
    });

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

  User.findByIdAndUpdate(id, {
      $set: body
    }, {
      new: true
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }

      res.send({
        user
      });
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