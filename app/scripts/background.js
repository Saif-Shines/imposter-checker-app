var tdna = new TypingDNA();
var client;

var ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  app.initialized().then(_client => {
    client = _client;
    console.log('cliked on set record btn');

    client.events.on("ticket.sendReply", performCheck)

    function performCheck() {
      var ticketTypePattern = tdna.getTypingPattern({
        type: 0,
        length: 160
      });
      localStorage.setItem('ticketTypePattern', ticketTypePattern);
    }

  });
});
