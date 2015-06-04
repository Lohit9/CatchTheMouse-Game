var express  = require('express'),
	http 	 = require('http'),
	socketIO = require('socket.io');

/**
 * app - The Express server instance: http://expressjs.com/
 */
var app 	= express();

/**
 * server - The http server instance: https://nodejs.org/api/http.html
 *        - This is the actual 'listener' for HTTP connections, both express
 *          and socket.io use it on incoming connections
 */
var server 	= http.createServer(app);

/**
 * io - The socket.io instance: http://socket.io/
 */
var io 		= socketIO(server);

/**
 * The port we're going to listen on
 * @type {Number}
 */
var port 	= 3000;

/**
 * Starts up the server instance listening on the given port!
 */
server.listen(port, function () {
  console.info('Server listening at port %d', port);
});

/**
 * Binds the /public directory to serve files if no other routes are found
 */
app.use(express.static(__dirname + '/public'));



var socketList = [];


/**
 * Called when a new socket.io connection is received
 * @param  {Socket} socket  - The websocket to the user
 */
io.on('connection', function (socket) {
	socketList.push(socket);
     socket.score =100;
	socket.emit('welcome', 'friend');	

	socket.on('disconnect', function() {
		mouseDisconnect(socket.id);
		socketList.splice(socketList.indexOf(socket), 1);
	});


	socket.on('broadcast', function(message, data) {
		console.log('received a broadcast: ', message, data);
		broadcast(message, data);
	});

	socket.on('mouseMove',function(currentX,currentY){
		console.log("inside server");
		brodcastall(socket,currentX,currentY); 
	})

	socket.on('mouseClick',function(id)
	{
         mouseScored(socket,id);

	})





});


function broadcast(message, data) {
	console.log(socketList);
	for(var n = 0; n < socketList.length; n++) {
		var socket = socketList[n];
        
		socket.emit('broadcast', message, data);
	}
};
function brodcastall(socker2,currentX,currentY)
{
	for (var i=0 ; i<socketList.length;i++)
	{
		var socket = socketList[i];
		var actid = socket.id;
		if(socker2.id != actid)
		{
		socket.emit('mouseMoved',socker2.id,currentX,currentY);}
	}
}

function mouseDisconnect(id)
{
	for (var i=0 ; i<socketList.length;i++)
	{
		var socket = socketList[i];
		var actid = socket.id;
		if(id != actid)
		{
		    socket.emit('mouseDisconnected',id);
           
		}
	}
}

function mouseScored(socket1,id2)
{
	var socker2 = null;
	for (var i=0 ; i<socketList.length;i++)
	{
		var socker = socketList[i];
		var actid = socker.id;
	   if (actid == id2) {
	   	 socker2 =  socker;
	   }
	}

	socket1.score++
	socker2.score--
    broadcaster(socket1.id,socket1.score);
    broadcaster(socker2.id,socker2.score);


}

function broadcaster(id,score)
{
   for(var i=0;i<socketList.length;i++)
   {
   	var socker = socketList[i];
	
        socker.emit ('mouseScore',id,score);

   	 

   }
}