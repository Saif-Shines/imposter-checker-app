var client;
var shouldIntercept;


isDocumentReady();

function startAppRender() {
  app
    .initialized()
    .then(function(_client) {
      client = _client;
      client.events.on('app.activated', setupInterception);
    })
    .catch(errorHandler);
}

function setupInterception() {
  shouldIntercept = false;
  let secureModal = document.querySelector('.secureSetup');
  secureModal.addEventListener('click', dispSecModal);
  function dispSecModal() {
    client.interface.trigger('showModal', {
      title: 'Secure Modal',
      template: 'views/modal.html'
    });
  }
}

function errorHandler(err) {
  console.error(`App failed to initialize because...`);
  console.error(err);
}

function isDocumentReady() {
  if (document.readyState != 'loading') {
    console.info('There is an error in rendering the app!');
  } else {
    document.addEventListener('DOMContentLoaded', startAppRender);
  }
}
