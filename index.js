// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/index.html'));
});// Starts the server.
server.listen(5000, function() {
console.log('Starting server on port 5000');
});

//Array to hold Choices to check later on 
var listOfChoices = [];
var players = {};

// Add the WebSocket handler
// Server identifies whether user leaves or joins
io.on('connection', function(socket) {
  socket.on("connect", function(){ 
    console.log("user connected");
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

io.on("connection", function(socket) {
  socket.on("sendChoice", function(data) {
    players[socket.id] = {
      choice: data
    };
  
  if(listOfChoices[0] != players[socket.id].choice){
    listOfChoices.push(players[socket.id].choice);
    socket.emit('choiceConfirmed');
  } else {
    console.log('choice has already been entered!');
  }
  });;
});

io.on('connection', function(socket) {

  socket.on('play', function() {

    var c1 = listOfChoices[0];
    var c2 = listOfChoices[1];
    console.log(c1);
    console.log(c2);

    if (c1 == 'rock') {
      if (c2 == 'rock') {
        io.sockets.emit('Players Tie', "Players Tied");
      } else if (c2 == 'paper') {
        io.sockets.emit('Players 2', "Paper Covers Rock");
      } else if (c2 == 'scissors') {
        io.sockets.emit('Players 1', "Rock Breaks Scissors");
      }
    } else if (c1 == 'paper') {
      if(c2 == 'rock'){
        io.sockets.emit('Players 1', "Paper Covers Rock");
      } else if (c2 == 'paper') {
        io.sockets.emit('Players Tie', "Players Tied");
      } else if (c2 == 'scissors') {
        io.sockets.emit('Players 2', "Scissors Cuts Paper");
      }
    } else if (c1 == 'scissors') {
      if(c2 == 'rock'){
        io.sockets.emit('Players 2', "Rock Breaks Scissors");
      } else if (c2 == 'paper') {
        io.sockets.emit('Players 1', "Scissors cuts Paper");
      } else if (c2 == 'scissors') {
        io.sockets.emit('Players Tie', "Players Tied");
      }
    }
  });
});

//When user presses play again it will clear the choice previously entered
io.on("connection", function(socket) {
  socket.on('playAgain', function() {
    listOfChoices.pop();
    listOfChoices.pop();
    socket.broadcast.emit('newGame');
  });
});





