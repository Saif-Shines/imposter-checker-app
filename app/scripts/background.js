var tdna = new TypingDNA();
var client;

var errorHandler = console.error;
var logger = console.log;

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

document.onreadystatechange = function() {
  if (document.readyState == 'complete') startAppRender();

  function startAppRender() {
    var onInit = app.initialized();
    var quoteTwoBtn = document.querySelector('.quote-two');
    var saveSettings = document.querySelector('.saveSettings');

    onInit.then(getClientObj);

    function getClientObj(_client) {
      var secondQuote;

      client = _client;
      console.log('background app loded');
      secondQuote = localStorage.getItem('secondQuote');
      quoteTwoBtn.innerText = secondQuote;
      // var renderQuote = client.request.invoke('getQuote', {});

      // renderQuote.then(data => {
      //   secondQuote = String(JSON.parse(data.response).quote);
      //   quoteTwoBtn.innerText = secondQuote;
      // }, errorHandler);

      saveSettings.addEventListener('click', function saveSecondPattern() {
        var pattern2 = tdna.getTypingPattern({
          type: 1,
          text: String(secondQuote)
        });
        localStorage.setItem('secondPattern', pattern2);
      });
    }
  }
};
