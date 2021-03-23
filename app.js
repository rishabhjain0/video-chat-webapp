const express = require('express');
const app = express();
const server  = require('http').Server(app);
var socketIO = require('socket.io');
var io = socketIO(server);
var http = require('http');

let RoomId='';

const {v4:uuidV4} = require('uuid');

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/createLink',(req,res)=>{
    res.redirect('/meetPage');
})
app.get('/meetPage',(req,res)=>{
        if(RoomId == ''){
        const uuid = uuidV4();
        RoomId = uuid;
        }
        res.render('meetPage',{roomID:RoomId});
})

app.get('/joinMeet/:rid',(req,res)=>{
    console.log(req.params.rid);
    if(RoomId === req.params.rid){
        res.redirect('/meetPage');
    }else{
    res.redirect('/');
    }
})



io.sockets.on('connection', function(socket) {


	function log() {
	  var array = ['Message from server:'];
	  array.push.apply(array, arguments);
	  socket.emit('log', array);
	}
  

    socket.on('message', function(message, room) {
	  log('Client said: ', message);
	  socket.in(room).emit('message', message, room);
	});
  
	socket.on('create or join', function(room) {
	  log('Received request to create or join room ' + room);
	  var clientsInRoom = io.sockets.adapter.rooms[room];
      let roomclients = io.sockets.adapter.rooms.get(room);
      log(roomclients);
	//   var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
      var numClients = roomclients ? roomclients.size : 0;

	  log('Room ' + room + ' now has ' + numClients + ' client(s)');
  
	  if (numClients === 0) {
		socket.join(room);
		log('Client ID ' + socket.id + ' created room ' + room);
		socket.emit('created', room, socket.id);
  
	  } else if (numClients < 6) {
		log('Client ID ' + socket.id + ' joined room ' + room);
		io.sockets.in(room).emit('join', room);
		socket.join(room);
		socket.emit('joined', room, socket.id);
		io.sockets.in(room).emit('ready');
	  } else { 
		socket.emit('full', room);
	  }
	});
  
	socket.on('ipaddr', function() {
	  var ifaces = os.networkInterfaces();
	  for (var dev in ifaces) {
		ifaces[dev].forEach(function(details) {
		  if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			socket.emit('ipaddr', details.address);
		  }
		});
	  }
	});
  
	socket.on('bye', function(){
	  console.log('received bye');
	});
  
  });

server.listen(process.env.PORT || 3000,);