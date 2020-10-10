var tdna = new TypingDNA();
var client;

document
  .querySelector('.interceptSendReply')
  .addEventListener('fwChange', shouldAllowReply);
document
  .querySelector('.interceptDelTkt')
  .addEventListener('fwChange', shouldDeleteTicket);
document
  .querySelector('.interceptPropUpdated')
  .addEventListener('fwChange', shouldAllowPropUpdate);
document
  .querySelector('.interceptCloseTkt')
  .addEventListener('fwChange', shouldCloseTkt);

function shouldAllowReply() {
  console.log('Triggeredz: should Allow Reply');
  if (
    localStorage.getItem('shouldInterceptReply') == 'true' ||
    localStorage.getItem('shouldInterceptReply') == null
  ) {
    console.log('setting item to false');
    localStorage.setItem('shouldInterceptReply', 'false');
  } else {
    localStorage.setItem('shouldInterceptReply', 'true');
  }
}

function shouldDeleteTicket() {
  if (
    localStorage.getItem('shouldInterceptDelete') == 'true' ||
    localStorage.getItem('shouldInterceptReply') == null
  ) {
    localStorage.setItem('shouldInterceptDelete', 'false');
  } else {
    localStorage.setItem('shouldInterceptDelete', 'true');
  }
}

function shouldAllowPropUpdate() {
  if (
    localStorage.getItem('interceptPropUpdate') == 'true' ||
    localStorage.getItem('interceptPropUpdate') == null
  ) {
    localStorage.setItem('interceptPropUpdate', 'false');
  } else {
    localStorage.setItem('interceptPropUpdate', 'true');
  }
}

function shouldCloseTkt() {
  console.log('Triggered: interceptPropUpdate');
  if (
    localStorage.getItem('interceptCloseTkt') == 'true' ||
    localStorage.getItem('interceptCloseTkt') == null
  ) {
    localStorage.setItem('interceptCloseTkt', 'false');
  } else {
    localStorage.setItem('interceptCloseTkt', 'true');
  }
}

var ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  app.initialized().then(_client => {
    client = _client;
    console.log('background app loded');
    var quoteTwo = document.querySelector('.quote-two');

    client.request.invoke('getQuote', {}).then(
      data => {
        quoteTwo.innerText = String(JSON.parse(data.response).quote);
      },
      error => {
        console.log(error);
      }
    );

    var saveSettings = document.querySelector('.saveSettings');
    saveSettings.addEventListener('click', function() {
      var pattern2 = tdna.getTypingPattern({ type: 0, length: 160 });
      localStorage.setItem('secondPattern', String(pattern2));
    });
  });
});
