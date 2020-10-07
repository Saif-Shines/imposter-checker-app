var [apiKey, apiSecret] = [
  '7f4692a27293d3ad31e3bef477726198',
  '5016de95a39c8dec3ebbcec368457ab9'
];
var requests = require('requests');
var Buffer = require('buffer/').Buffer;
var response;

var options = {
  headers: {
    Authorization:
      'Basic ' + Buffer(apiKey + ':' + apiSecret).toString('base64')
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

// function doesMatch() {
//   res;
// }

exports = {
  getQuote
};
