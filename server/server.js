var [apiKey, apiSecret] = [
  '7f4692a27293d3ad31e3bef477726198',
  '5fb3d3b43922cf2d12df613b6411d470'
];

var superagent = require('superagent');


function getQuote() {
  superagent
    .get('https://api.typingdna.com/quote')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ max: '45' })
    .auth(apiKey, apiSecret)
    .then(
      data => {
        console.log('*** **** **** *** *** ');
        console.log('received quote', data.text);
        renderData(null, data.text);
      },
      err => console.error(err)
    );
}

function doesMatch(patterns) {
  delete patterns.iparams;
  delete patterns.isInstall;
  console.log(patterns);
  superagent
    .post('https://api.typingdna.com/match')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Cache-Control', 'no-cache')
    .auth(apiKey, apiSecret)
    .send(patterns)
    .then(
      data => {
        console.log('***************************************');
        console.log('received data', data.text);
        renderData(null, data.text);
      },
      err => console.error(err)
    )
    .catch(console.error);
}

exports = {
  getQuote,
  doesMatch
};
