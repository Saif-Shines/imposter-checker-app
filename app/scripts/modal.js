var client;
var tdna = new TypingDNA();
var [input_init, input_final, verifyNow, toSecureReply, quoteOne] = [
  document.querySelector('.initial-dna'),
  document.querySelector('.final-dna'),
  document.querySelector('.verifyBtn'),
  document.querySelector('.intercept-reply'),
  document.querySelector('.quote-one')
];

verifyNow.addEventListener('click', capturePattern);
toSecureReply.addEventListener('fwChange', replyToggle);

function replyToggle() {
  console.log('Triggered');
  if (localStorage.getItem('reply' == 'true')) {
    localStorage.setItem('reply', 'false');
  } else {
    localStorage.setItem('reply', 'true');
  }
}

function capturePattern() {
  console.log('capturing pattern...');
  var typingPattern_init = tdna.getTypingPattern({
    type: 0,
    length: 160
  });

  var typingPattern_final = localStorage.getItem('quoteOnePattern');

  var patternQuality = tdna.getQuality(typingPattern_init);
  console.log(patternQuality);

  
}

var ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  app.initialized().then(_client => {
    client = _client;

  });
});
