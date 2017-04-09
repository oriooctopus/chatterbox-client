// YOUR CODE HERE:
class App {
  constructor() {
    this.url = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
    this.friends = {}
    this.roomsRendered = false
    this.currentRoom = 'lobby'
    this.friends = []
    this.username = document.URL.replace(/.*?username\=/gim,"");
    this.username = this.username.replace(/#/,"");
  }

  init() {
    this.fetch(this.url)
  }

  fetch(url) {
    var thisVar = this;
    $.ajax({
      url: url, 
      type: 'GET',
      contentType: 'application/json',
      data: {'order': '-createdAt'},
      success: function(data) {
        console.log(data);
        thisVar.data = data.results;
        thisVar.clearMessages();
        thisVar.renderMessage(thisVar.data, false);
        if (thisVar.roomsRendered === false) {
          thisVar.roomsRendered = true;
          thisVar.findRooms();
          thisVar.renderRooms();
        } 
      }
    })
  }

  send(data) {
    var thisVar = this;
    $.ajax({
      url: thisVar.url,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    })
  }

  clearMessages() {
    $('#chats').html('')
  }

  renderMessage(renderMsg, filter) {
    var html = '';
    var thisVar = this;

    if (filter !== false) {
      renderMsg = renderMsg.filter(function(element) {
        return element.roomname === filter;
      });
    }

    for (var i = 0; i < renderMsg.length; i++) {
      var username = renderMsg[i].username;
      var text = renderMsg[i].text;
      if (text !== undefined) {
        text = text.replace(/\&/g, '&amp;')
        text = text.replace(/\</g, '&lt;');
        text = text.replace(/\>/g, '&gt;');
        text = text.replace(/\'/g, '&#x27;');
        text = text.replace(/\"/g, '&quot;');
        text = text.replace(/\\/g, '&#x2F;');

        var newMsg;
        if (this.friends.includes(username)) {
          newMsg = '<div class="inboundMsg friend ' + username + '">';
        } else {
          newMsg = '<div class="inboundMsg ' + username + '">';
        }
        newMsg += '<h3>' + username + '</h3>';
        newMsg += '<p>' + text + '</p>';
        newMsg += '</div>';
        
        html += newMsg;
      }
    }
    $('#chats').append(html);

    $('.inboundMsg').on('click', function() {

      var userClicked = $(this).find('h3').text();
      if (!thisVar.friends.includes(userClicked)) {

        thisVar.friends.push(userClicked);
        var messages = $('.inboundMsg');

        for (var i = 0; i < messages.length; i++) {
          if ($(messages[i]).hasClass(userClicked)) {
            $(messages[i]).addClass('friend');          
          }
        } 
      }
    });
  }

  refresh() {
    window.setInterval(function() {

    }, 50000);
  }

  findRooms() {
    this.rooms = {lobby: 'lobby'};
    for (var i = 0; i < this.data.length; i++) {
      if ( this.rooms.hasOwnProperty(this.data[i].roomname) !== true && this.data[i].roomname !== undefined) {        
        this.rooms[this.data[i].roomname] = this.data[i].roomname;
      }
    }
  }

  renderRooms() {
    var html = '';
    for (var key in this.rooms) {
      html += '<option class="room">' + this.rooms[key] + '</option>';
    }
    html += '<option class="room" id="createRoom">Create Room</option>'; 
    $('select').append(html);
  }

  handleUsernameClick() {
    this.friends.push(userClicked)
  }

  submit(value) {
    var inputValue = value || $('#messageInput').val();
    
    var message = {
      username: this.username,
      text: inputValue,
      roomname: this.currentRoom
    };  
    this.send(message); 
    this.fetch(this.url); 
  }
}

  // var app = {};
  // // this.friends = {};

  // app.init = function() { 
  //   this.url = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  //   this.fetch(this.url);
  //   this.roomsRendered = false;
  //   this.currentRoom = 'lobby';
  //   this.friends = ['Oliver'];
  // };
  // app.fetch = function(url) {
  //   $.ajax({
  //     url: url, 
  //     type: 'GET',
  //     contentType: 'application/json',
  //     data: {'order': '-createdAt'},
  //     success: function(data) {
  //       console.log(data);
  //       app.data = data.results;
  //       app.clearMessages();
  //       app.renderMessage(app.data, false);
  //       if (app.roomsRendered === false) {
  //         app.roomsRendered = true;
  //         app.findRooms();
  //         app.renderRooms();
  //       } 
  //     }
  //   });
  // };

  // app.send = function(x) {
  //   $.ajax({
  //     url: app.url,
  //     type: 'POST',
  //     data: JSON.stringify(x),
  //     contentType: 'application/json',
  //     success: function (data) {
  //       console.log('chatterbox: Message sent', data);
  //     },
  //     error: function (data) {
  //       console.error('chatterbox: Failed to send message', data);
  //     }
  //   });
  // };

  // app.clearMessages = function() {
  //   $('#chats').html('');
  // };
  
  // app.renderMessage = function(renderMsg, filter) {
  //   var html = '';

  //   if (filter !== false) {
  //     renderMsg = renderMsg.filter(function(element) {
  //       return element.roomname === filter;
  //     });
  //   }

  //   for (var i = 0; i < renderMsg.length; i++) {
  //     var username = renderMsg[i].username;
  //     var text = renderMsg[i].text;
  //     if (text !== undefined) {
  //       text = text.replace(/\&/g, '&amp;')
  //       text = text.replace(/\</g, '&lt;');
  //       text = text.replace(/\>/g, '&gt;');
  //       text = text.replace(/\'/g, '&#x27;');
  //       text = text.replace(/\"/g, '&quot;');
  //       text = text.replace(/\\/g, '&#x2F;');

  //       var newMsg;
  //       if (this.friends.includes(username)) {
  //         newMsg = '<div class="inboundMsg friend ' + username + '">';
  //       } else {
  //         newMsg = '<div class="inboundMsg ' + username + '">';
  //       }
  //       newMsg += '<h3>' + username + '</h3>';
  //       newMsg += '<p>' + text + '</p>';
  //       newMsg += '</div>';
        
  //       html += newMsg;
  //     }
  //   }
  //   $('#chats').append(html);

  //   $('.inboundMsg').on('click', function() {

  //     var userClicked = $(this).find('h3').text();
  //     if (!app.friends.includes(userClicked)) {

  //       app.friends.push(userClicked);
  //       var messages = $('.inboundMsg');

  //       for (var i = 0; i < messages.length; i++) {
  //         if ($(messages[i]).hasClass(userClicked)) {
  //           $(messages[i]).addClass('friend');          
  //         }
  //       } 
  //     }
  //   });
  // };
  
  // app.findRooms = function(data) {
  //   this.rooms = {lobby: 'lobby'};
  //   for (var i = 0; i < this.data.length; i++) {
  //     if ( this.rooms.hasOwnProperty(this.data[i].roomname) !== true && this.data[i].roomname !== undefined) {        
  //       this.rooms[this.data[i].roomname] = this.data[i].roomname;
  //     }
  //   }
  // };

  // app.renderRooms = function(roomName) {
  //   var html = '';
  //   for (var key in this.rooms) {
  //     html += '<option class="room">' + this.rooms[key] + '</option>';
  //   }
  //   html += '<option class="room" id="createRoom">Create Room</option>'; 
  //   $('select').append(html);
  // };
  
  // app.handleUsernameClick = function(userClicked) {
  //   this.friends.push(userClicked);
  // };

  // app.submit = function(value) {
  //   var inputValue = value || $('#messageInput').val();

  //   var username = document.URL.replace(/.*?username\=/gim,"");
  //   username = username.replace(/#/,"");
    
  //   var message = {
  //     username: username,
  //     text: inputValue,
  //     roomname: this.currentRoom
  //   };  
  //   app.send(message); 
  //   app.fetch(this.url);  
  // };