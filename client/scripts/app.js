// YOUR CODE HERE:
  var app = {};
  this.friends = {};
  

  app.init = function() { 
    this.fetch('http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby');
  };
  app.fetch = function(url) {
    $.ajax({
      url: url, 
      type: 'GET',
      success: function(data) {
        console.log(data);
        app.renderMessage(data.results);
      }
    });
  };
  app.send = function(x) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: "http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby",
      type: 'POST',
      data: JSON.stringify(x),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
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
    var room;
    for (var i = 0; i < renderMsg.length; i++) {
      var username = renderMsg[i].username;
      var text = renderMsg[i].text;
      var newMsg = "<div>";
      newMsg += "<h3>" + username + "</h3>";
      newMsg += "<p>" + text + "</p>";
      newMsg += "</div>";

      $('#chats').prepend('<div class=inboundMsg>' + newMsg + '</div>');
    }
  };
  
  app.renderRoom = function(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
  };
  
  app.handleUsernameClick = function(userClicked) {
    this.friends.push(userClicked);
  };

  app.handleSubmit = function() {
    var inputValue = $('#messageInput').val();

    var username = document.URL.replace(/.*?username\=/gim,"");
    username.replace(/#^/,"");
    
    var message = {
      username: username,
      text: inputValue,
      roomname: 'lobby'
    };  
    app.send(message);   
  };