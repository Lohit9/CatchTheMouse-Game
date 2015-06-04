#Videostream Interview
##Socket.io Boilerplate

Basically just a simple express, socket.io setup so we can get moving.

###Steps to get started:
1. Run `npm install`
2. Run `node index.js`
3. Go to town!


###Files/Folders:

####/package.json
This is the node package description. It holds all the required dependencies - 
when you run `npm install` it will install all of the dependencies

####/index.js
The entry script for node.js, it is responsible for startup up the server.
The startup consists of three things:
1. Require modules
2. Listen on given port
3. Initialize http, socket.io, and express instances

By default, a route is setup to redirect the user to `/app.html` if they just hit `http://<hostname>:3000/`
The socket.io connection logic also sits in this file by default

####/public/
This is the folder of static files that get served by express.

The default entry point is going to be `app.html`, and all things can go from there!
