var socket = io();
socket.on('message', function(data) {
  console.log('hi');
});

var player1Score = 0;
var player2Score = 0;

document.getElementById('rock').addEventListener('click', function(event) {
  document.getElementById('choice').innerHTML = 'Rock';
  socket.emit('sendChoice', 'rock');
});

document.getElementById('paper').addEventListener('click', function(event) {
  document.getElementById('choice').innerHTML = 'Paper';
  socket.emit('sendChoice', 'paper');
});

document.getElementById('scissors').addEventListener('click', function(event) {
  document.getElementById('choice').innerHTML = 'Scissors';
  socket.emit('sendChoice', 'scissors');
});

socket.on('choiceConfirmed', function() {
  socket.emit('play');
});

document.getElementById('playAgain').addEventListener('click', function(event) {
  socket.emit('playAgain');
  document.getElementById('result').innerHTML = 'New Round';
});

socket.on('Players Tie', function(data) {
  document.getElementById('result').innerHTML = data;
  document.getElementById('choice').innerHTML = 'Not set yet';
});

socket.on('Players 1', function(data) {
  document.getElementById('result').innerHTML = data;
  document.getElementById('u1score').innerHTML = ++player1Score;
  document.getElementById('choice').innerHTML = 'Not set yet';
});

socket.on('Players 2', function(data) {
  document.getElementById('result').innerHTML = data;
  document.getElementById('u2score').innerHTML = ++player2Score;
  document.getElementById('choice').innerHTML = 'Not set yet';
});

socket.on('newGame', function() {
  document.getElementById('result').innerHTML = 'New Round';
});

