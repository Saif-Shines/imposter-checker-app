var client;
var dna = new TypingDNA();
const MATCH_ENDPOINT = 'https://api.typingdna.com/match';

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

function setupInterception() {}

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
