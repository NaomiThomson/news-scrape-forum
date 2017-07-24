const request = require('request');
const cheerio = require('cheerio');
const path = require('path');

var {Article} = require('../models/article');

module.exports = app => {

// GET request to scrape Overwatch news
app.get('/scrape', (req, res) => {

  //Grab body of HTML
  request("https://news.blizzard.com/en-us/overwatch", (error, response, html) => {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands
    var $ = cheerio.load(html);

    // With cheerio, find each "articlelistitem" class
    // (i: iterator. element: the current element)
    $(".ArticleListItem").each((i, element) => {

      // An empty object to save the data that we'll scrape
      var result = {};

      var title = $(element)
        .children()
        .attr("data-analytics-placement")
        .split('-')[4]
        .trim();

      var ext = $(element).children().attr("href");
      var link = `https://news.blizzard.com${ext}`;

      result.title = title;
      result.link = link;

      // Save these results in an object that we'll push into the results object we defined earlier
      var entry = new Article(result);

      entry.save((err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      })
    });
  });
  res.send('Scrape Complete');
});


// Get articles we scraped from mongoDB
app.get('/articles', (req, res) => {

  Article.find({}, (err, doc) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      // res.send({doc})
      res.render('newsfeed', {doc});
    }
  });
});


// Get articles we scraped from mongoDB
app.get('/bookmarks', (req, res) => {

  Article.find({saved: true}, (err, doc) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      // res.send({doc})
      res.render('saved', {doc});
    }
  });
});


// Grab article by ObjectId
app.get('/articles/:id', (req, res) => {
  Article.findOne({'_id': req.params.id})
  .populate('note')
  .exec((err, doc) => {
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.json(doc)
    }
  });
});

// Create a new note or replace an existing note
app.post('/articles/:id', (req, res) => {

  var newNote = new Note(req.body);

  newNote.save((error, doc) => {
    if (error) {
      res.status(400).send(error)
    }
    else {

      Article.findOneAndUpdate({'_id': req.params.id}, {'note': doc._id})
      .exec((err, doc) => {
        if (err) {
          res.status(400).send(err)
        }
        else {
          res.send(doc)
        }
      })
    }
  })
})


}