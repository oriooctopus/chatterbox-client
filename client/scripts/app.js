// YOUR CODE HERE:
// $(function() {
  var app = {};
  this.friends = {};

  app.init = function() { /*initialize*/ };
  app.fetch = function(url) {
    $.ajax({
      url: url, 
      type: 'GET',
      success: function(data) {
        alert(data);
      }
    });
  };
  app.send = function(x) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/',
      type: 'POST',
      data: JSON.stringify(x),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };
  app.clearMessages = function() {
    $('#chats').html('');
  };
  
  app.renderMessage = function(renderMsg) {
    $('#chats').append('<div>' + renderMsg + '</div>');
  };
  
  app.renderRoom = function(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
  };
  
  app.handleUsernameClick = function(userClicked) {
    this.friends.push(userClicked);
  };

  app.handleSubmit = function() {
    var inputValue = $('#messageInput').val();
    var newMessage = '<div class="message">' + inputValue + '</div>';
    $('#chats').append(newMessage);
    app.send(inputValue);     
  };

  // app.send();
  // app.fetch();
// });