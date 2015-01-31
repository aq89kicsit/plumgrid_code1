var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


///////////////////////// from js
var world = [[0,1,0,0,0,0],[0,0,0,1,0,0],[0,0,0,0,0,0],[0,0,1,0,1,0],[0,0,0,0,0,1],[1,0,0,0,0,0]];	//2d array grid robot plane
var totalTrashes = 0;
var totalTrashesTotal = 0;
var trashLocation = [[]];	// i think this will not work 
var trachj = [];	//again
var trachk = [];	//again
var worldHeight = 6;
var worldWidth = 6;
var onlyforone = 0;
// size of a tile in pixels
var tileHeight = 32;
var tileWidth = 32;
//////////////////////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){	//when i write some thing in test field this will call
  socket.on('robot location', function(msg){
	io.emit('init plane', 'Initializing the plane');
	io.emit('status active', 'Active');
	io.emit('robot location client', msg);
	io.emit('status active', 'Active');
//////////////////////////////// for total trashes //////////////////////

if(onlyforone == 0){
	onlyforone = 1;
	trachj = [];
	trachk = [];
	totalTrashes = 0;
	for(var j=0;j<worldWidth;j++){
		for(var k=0;k<worldHeight;k++){
			if(world[j][k] == 1){
				trachj.push(j);
				trachk.push(k);
				totalTrashes++;		//count plus total trashes in ground 
			}
		}
	}
}
io.emit('robot total trashes', totalTrashes);
/////////////////////////////////////////////////////////////////////////
	var a = msg;
	var msg_robotlocation = "New location:- "+a;
	var msg_plan_init = "-:Initializing plan:- ";
	console.log(msg_robotlocation);

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
