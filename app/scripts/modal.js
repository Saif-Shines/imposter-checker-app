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
  console.log(input_init.value, input_final.value);
  var typingPattern_init = tdna.getTypingPattern({
    type: 0,
    length: 160,
    text: String(input_init.value)
  });

  var typingPattern_final = tdna.getTypingPattern({
    type: 0,
    length: 160,
    text: String(input_final.value)
  });

  var patternQuality = tdna.getQuality(typingPattern_init);
  console.log(patternQuality);

  var patterns = {
    tp1: String(typingPattern_init),
    tp2: String(typingPattern_final),
    method: 'POST'
  };

  client.request.invoke('doesMatch', patterns).then(
    function(data) {},
    function(err) {
      console.log(err);
    }
  );
}

var ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  app.initialized().then(_client => {
    client = _client;
    client.request.invoke('getQuote', {}).then(
      data => {
        quoteOne.innerText = String(JSON.parse(data.response).quote);
      },
      error => {
        console.log(error);
      }
    );
  });
});
