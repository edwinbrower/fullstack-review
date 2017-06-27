var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  id: { 
    type: Number, 
    unique: true 
  },
  name: String,
  url: String,

});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;