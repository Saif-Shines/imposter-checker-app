var client, quoteOne, firstPattern, imposterFreeSetup;
var tdna = new TypingDNA();

[quoteOne, firstPattern, imposterFreeSetup] = [
  document.querySelector('.quote-one'),
  document.querySelector('.savefirstPattern'),
  document.querySelector('.open-modal')
];

var errorHandler = console.error;

document.onreadystatechange = function() {
  if (document.readyState == 'complete') startAppRender();

  function startAppRender() {
    var getClientObj = app.initialized();

    getClientObj.then(addClient).catch(errorHandler);

    function addClient(_client) {
      client = _client;
      client.events.on('app.activated', startApp);
    }
  }
};

function startApp() {
  firstPattern.addEventListener('click', storePattern);

  var renderQuote = client.request.invoke('getQuote', {});

  renderQuote.then(data => {
    quoteOne.innerText = String(JSON.parse(data.response).quote);
  }, errorHandler);


  imposterFreeSetup.addEventListener('click', () => {
    client.interface
      .trigger('showModal', {
        title: 'Setup Imposter free session',
        template: 'views/background.html'
      })
      .then(function(data) {
        console.log('from imposterfreesetup', data);
      })
      .catch(function(error) {
        console.log('from imposterfreesetup', error);
      });
  });

  function storePattern() {
    console.log('storing first pattern');
    var firstPattern = tdna.getTypingPattern({ type: 0, length: 160 });
    localStorage.setItem('firstPattern', firstPattern);
  }

  client.events.on('ticket.propertiesUpdated', isImposter, {
    intercept: true
  });

  function isImposter(event) {
    checkPattern();

    function checkPattern() {
      var [typ1, typ2] = [
        localStorage.getItem('firstPattern'),
        localStorage.getItem('secondPattern')
      ];

      var patterns = { tp1: String(typ1), tp2: String(typ2) };

      client.request.invoke('doesMatch', patterns).then(
        function(data) {
          var response = JSON.parse(data.response);
          console.log(response);
          if (response.result == 1) {
            console.log('allow sending', response.result);
            event.helper.done();
          } else {
            console.log('mismatch', event);
            event.helper.fail('Seems like an imposter');
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }

  // client.events.on('ticket.sendReply', isImposter, { intercept: true });

  // client.events.on('ticket.deleteTicketClick', isImposter, {
  //   intercept: true
  // });
  // client.events.on('ticket.closeTicketClick', isImposter, {
  //   intercept: true
  // });
}
