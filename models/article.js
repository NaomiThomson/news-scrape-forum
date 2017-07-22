var mongoose = require('mongoose');

var Article = mongoose.model('Article', {
  title: {
    type: String,
    required: true,
    minlength: 1
  }, 
  link: {
    type: String,
    required: true,
    minlength: 1
  }
})

module.exports = {Article};