var client;

isDocumentReady();

function startAppRender() {
  app
    .initialized()
    .then(function(_client) {
      client = _client;
      client.events.on('app.activated', configureInterception);
    })
    .catch(errorHandler);
}

function configureInterception() {
  let secureModal = document.querySelector('.secureSetup');
  secureModal.addEventListener('click', dispSecModal);
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
