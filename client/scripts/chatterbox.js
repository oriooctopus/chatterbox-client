// jQuery utility functions to update Chatterbox index.html
$(function() {

  var app = new App();
  app.init();
  $('.submit').on('click', function() {
    app.submit();
  });

  $('select').change('mousedown', function(e) {
  	var selectedIndex = $('select').prop('selectedIndex');
  	var currentRoom = $('select')[0][selectedIndex];
    var submitMsg = 'This is a new room created by Oliver';
    
    if (currentRoom.id === 'createRoom') { 

      currentRoom = prompt('Enter a new room name');
      $('select').prepend('<option class="room">' + currentRoom + '</option>');
      app.currentRoom = currentRoom;
      app.submit(submitMsg);
      $('select')[0].selectedIndex = 0;
      
      app.clearMessages();
      debugger;
      var username = app.username;
      var newMsg;

      if (app.friends.includes(username)) {
        newMsg = '<div class="inboundMsg friend ' + username + '">';
      } else {
        newMsg = '<div class="inboundMsg ' + username + '">';
      }
      newMsg += '<h3>' + username + '</h3>';
      newMsg += '<p>' + submitMsg + '</p>';
      newMsg += '</div>';
      
      html += newMsg;
      $('#chats').append(html);

  	} else if ($(currentRoom).text() === 'lobby') {

      app.clearMessages();
      app.renderMessage(app.data, false);
      app.currentRoom = 'lobby';

    } else {

    	currentRoom = $(currentRoom).text();
      app.currentRoom = currentRoom;

      app.clearMessages();
      app.renderMessage(app.data, currentRoom);

    }

  });

});