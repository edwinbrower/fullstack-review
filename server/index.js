var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var githubToken = require('./githubToken');
var repo = require('../database/index.js');
var fakeData = require('../data.json');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  console.log('inside server post');
  var myUsername = 'edwinbrower';
  var enteredUsername = req.body.username;
  var options = {
    url: `https://api.github.com/users/${enteredUsername}/repos`,
    // url: `https://api.github.com/users/${myUsername}/repos/?access_token=${githubToken.githubToken}`,
    headers: {
      'User-Agent': 'myUsername'
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      // resolve(response);
      var data = JSON.parse(body);
      // console.log('data', data);
      data.forEach(function(thisRepo) {
        new repo(thisRepo).save();
      });
    }

    // res.send('doneee');
    res.sendStatus(201);    
  });
});

app.get('/repos', function (req, res) {
  var query = req.query.data;
  console.log('the query', query);
  repo.find({}).sort({ [query] : -1 }).limit(25).exec((err, results) => {
    res.json(results);
  });
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

