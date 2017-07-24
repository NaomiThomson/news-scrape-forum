var mongoose = require('mongoose');

var Article = mongoose.model('Article', {
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 1
  }, 
  link: {
    type: String,
    unique: true,
    required: true,
    minlength: 1
  }, 
  saved: {
    type: Boolean,
    default: false
  }
})

module.exports = {Article};