var tdna = new TypingDNA();
var client;
var [input_init, input_final, verifyNow] = [
  document.querySelector('.initial-dna'),
  document.querySelector('.final-dna'),
  document.querySelector('.verifyBtn')
];
var toSecureReply = document.querySelector('.intercept-reply');

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

function capturePattern(e) {
  var typingPattern_init = tdna.getTypingPattern({
    type: 0,
    length: 160,
    text: input_init.value
  });
  var patternQuality = tdna.getQuality(typingPattern_init);
  console.log(patternQuality);
  client.request.invoke('getQuote', {}).then(
    data => {
      console.log(data);
    },
    error => {
      console.log(error);
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
  });
});
