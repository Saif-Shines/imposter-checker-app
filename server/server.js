var [apiKey, apiSecret] = [
  '7f4692a27293d3ad31e3bef477726198',
  '5016de95a39c8dec3ebbcec368457ab9'
];
var superagent = require('superagent');
var querystring = require('querystring');
var base_url = 'api.typingdna.com';

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
  superagent
    .post('https://api.typingdna.com/match')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Cache-Control', 'no-cache')
    .auth(apiKey, apiSecret)
    .send(patterns)
    .then(res => {
      renderData(null, res);
    }, err => console.error(err));

}

exports = {
  getQuote,
  doesMatch
};
