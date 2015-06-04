var socket = io();

var mice = {};

socket.on('mouseMoved', function(id, x, y) {
	if (!mice[id]) {
		mice[id] = {
			cursor: document.createElement('div')
		};

		mice[id].cursor.classList.add('cursor');

		document.body.appendChild(mice[id].cursor);
		mice[id].cursor.addEventListener('click', function() {
			socket.emit('mouseClick', id);
		});
	}


	mice[id].cursor.style.left = x + "px";
	mice[id].cursor.style.top = y + "px";
});


socket.on('mouseDisconnected', function(id) {
	if (mice[id]) {
		document.body.removeChild(mice[id].cursor);
		delete mice[id];
	}
});

socket.on('mouseScore', function(id, score) {
	if (mice[id]) {
		mice[id].cursor.textContent = score;
	}
});


var currentX = 0;
var currentY = 0;
document.body.addEventListener('mousemove', function(event) {
	currentX = event.clientX;
	currentY = event.clientY;
});


setInterval(function() {
	console.log('Emitting position', currentX, currentY);
	socket.emit('mouseMove', currentX, currentY);
}, 100)