let app = require('express')();
let http = require('http').Server(app);
var io = require('socket.io')(http);

var history = [];
var client = [];

app.get('/', (req, res) => {
  //res.send('<h1>hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

http.listen(8000, () => {
  console.log('listening on *:8000');
});


io.on('connection', (socket) => {
  //console.log('a user connected');
  client.push({id : socket.client.id})
    //console.log(client);
    var getClientID = client.find(e => (e.id === socket.client.id))
    //console.log("the Client", getClientID);
    if(getClientID){
      new_history = history.join(' '); //removing comma when displaying array
      socket.emit("chat message", new_history);
    }
  socket.on('chat message', (msg) => {
    //console.log('message: ' + msg);
    history.push(" " + msg);
    //console.log(history);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
