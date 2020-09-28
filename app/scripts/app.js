var client;

isDocumentReady();

function startAppRender() {
  app
    .initialized()
    .then(function(_client) {
      client = _client;
      client.events.on('app.activated', renderContactName);
    })
    .catch(errorHandler);
}

function renderContactName() {
  var textElement = document.getElementById('apptext');
  client.data
    .get('contact')
    .then(function({ contact: { name } }) {
      textElement.innerHTML = `Data Method returned with requester name: ${name}`;
    })
    .catch(errorHandler);
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
