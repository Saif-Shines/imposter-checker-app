var [apiKey, apiSecret] = [
  '7f4692a27293d3ad31e3bef477726198',
  '5016de95a39c8dec3ebbcec368457ab9'
];
var requests = require('requests');
var Buffer = require('buffer/').Buffer;

var options = {
  headers: {
    Authorization:
      'Basic ' + Buffer(apiKey + ':' + apiSecret).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  min: '40',
  max: '60'
};

function getQuote() {
  console.log('getting Quote');
  requests('https://api.typingdna.com/quote', options)
    .on('data', function(chunk) {
      console.log(chunk);
      renderData(null, chunk);
    })
    .on('end', function(err) {
      if (err) return console.log('connection closed due to errors', err);
      console.log('end');
    });
}

function doesMatch(patterns) {
  var MatchOptions = {
    headers: {
      Authorization:
        'Basic ' + Buffer(apiKey + ':' + apiSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  var matchOpts = Object.assign(patterns, MatchOptions);
  delete matchOpts.iparams;
  delete matchOpts.isInstall;
  console.log(matchOpts);
  requests('https://api.typingdna.com/match', matchOpts)
    .on('data', function(chunk) {
      console.log(JSON.parse(chunk));
      renderData(null, chunk);
    })
    .on('end', function(err) {
      if (err) return console.log('connection closed due to errors', err);
      console.log('end');
    });
}

exports = {
  getQuote,
  doesMatch
};
