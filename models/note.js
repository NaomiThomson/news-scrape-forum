var mongoose = require('mongoose');

var Note = mongoose.model('Note', {
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 1
  }, 
  boedy: {
    type: String,
    unique: true,
    required: true,
    minlength: 1
  }
})

module.exports = {Note};