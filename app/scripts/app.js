var client;
var tdna = new TypingDNA();

isDocumentReady();

function startAppRender() {
  app
    .initialized()
    .then(function(_client) {
      client = _client;
      client.events.on('app.activated', startApp);
    })
    .catch(errorHandler);
}

function startApp() {
  var quoteOne = document.querySelector('.quote-one');
  client.request.invoke('getQuote', {}).then(
    data => {
      quoteOne.innerText = String(JSON.parse(data.response).quote);
    },
    error => {
      console.log(error);
    }
  );
  console.log('starting the app');
  let firstPattern = document.querySelector('.savefirstPattern');
  firstPattern.addEventListener('click', storePattern);

  let imposterFreeSetup = document.querySelector('.open-modal');
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

function errorHandler(err) {
  console.error(`App failed to initialize because...`);
  console.error(err);
}

function isDocumentReady() {
  if (document.readyState != 'loading') {
    console.info('Oh you deferred scripts!');
    startAppRender();
  } else {
    document.addEventListener('DOMContentLoaded', startAppRender);
  }
}
