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
  console.log('starting the app');
  let secureModal = document.querySelector('.secureSetup');
  secureModal.addEventListener('click', dispSecModal);
  let setRecord = document.querySelector('.setRecord');
  setRecord.addEventListener('click', createRecord);

  client.events.on('ticket.sendReply', shouldInterceptReply, {
    intercept: true
  });

  function dispSecModal() {
    client.interface.trigger('showModal', {
      title: 'Secure Modal',
      template: 'views/modal.html'
    });
  }

  function shouldInterceptReply(event) {
    console.log(event.type, localStorage.getItem('reply'));
    if (event.type == 'ticket.sendReply' && localStorage.getItem('reply')) {
      console.log('mismatch');
      event.helper.fail('Mismatch in typing detected!');
    } else {
      console.log('allow sending');
      event.helper.done();
    }
  }

  function createRecord() {
    console.log('cliked on set record btn');
    var quoteOnePattern = tdna.getTypingPattern({ type: 0, length: 160 });
    localStorage.setItem('quoteOnePattern', quoteOnePattern);
  }
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
