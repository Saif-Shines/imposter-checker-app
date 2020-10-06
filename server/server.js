var [apiKey, apiSecret] = [
  '7f4692a27293d3ad31e3bef477726198',
  '5016de95a39c8dec3ebbcec368457ab9'
];
var requests = require('requests');
var Buffer = require('buffer/').Buffer;
var response;

function getQuote() {
  var options = {
    headers: {
      Authorization:
        'Basic ' + Buffer(apiKey + ':' + apiSecret).toString('base64')
    },
    min: '40',
    max: '60'
  };
  console.log('getting Quote...');
  response = requests('https://api.typingdna.com/quote', options)
    .on('data', chunk => console.log(chunk))
    .on('end', err => console.log(err));
  renderData(null, { status: 'success', response });
}

exports = {
  getQuote
};
