var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected!');
});

var repoSchema = mongoose.Schema({
  id: { 
    type: Number, 
    unique: true 
  },
  name: String,
  full_name: String,
  html_url: String,
  description: String
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;