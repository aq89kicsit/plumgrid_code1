	var canvas = null;	//2d array grid
	//var world = [[0,1,0,0,0,0],[0,1,0,1,0,0],[0,1,0,0,0,0],[0,1,1,0,1,0],[0,1,0,0,0,1],[1,1,1,1,1,0]];	//2d array grid
	var world = [[0,1,0,0,0,0],[0,0,0,1,0,0],[0,0,0,0,0,0],[0,0,1,0,1,0],[0,0,0,0,0,1],[1,0,0,0,0,0]];	//2d array grid

	// the canvas 2d context
	var ctx = null;
	// an image containing all sprites
	var spritesheet = null;
	var robot = null;

	// current robot position 
	var robotPosition = null;
	//var total trash in ground
	var totalTrashes = 0;
	var totalTrashesTotal = 0;
	var trashLocation = [[]];	// i think this will not work 
	var trachj = [];	//again
	var trachk = [];	//again
	
	var currentPathArray = [];

	// height and width of ground
	// user should enter these paths
	var worldHeight = 6;
	var worldWidth = 6;
	
	// size of a tile in pixels
	var tileHeight = 32;
	var tileWidth = 32;
	// true when the spritesheet has been downloaded
	var spritesheetLoaded = false;
	
	// start and end of path
	var pathStart = [worldWidth,worldHeight];
	var pathEnd = [0,0];
	var currentPath = [];

	function robotGround(newpointsrobot){
		canvas = document.getElementById('robotGround');
		canvas.width = worldWidth * tileWidth;
		canvas.height = worldHeight * tileHeight;
		
		ctx = canvas.getContext("2d");
		
		spritesheet = new Image();
		spritesheet.src = 'http://epicanka.com/celib/code1/public/img/spritesheet.png';
		//spritesheet.src = 'img/spritesheet.png';
		robot = new Image();
		robot.src = 'img/robot.png';
		//alert(spritesheet.src);

		console.log('Spritesheet loaded.');
		spritesheetLoaded = true;
		
		console.log('Creating world...');
		
		// create emptiness
		/* for (var x=0; x < worldWidth; x++){
			world[x] = [];

			for (var y=0; y < worldHeight; y++)
			{
				world[x][y] = 0;
			}
		} */
		
		// scatter some walls
		/* for (var x=0; x < worldWidth; x++){
			for (var y=0; y < worldHeight; y++)
			{
				if (Math.random() > 0.75)
				world[x][y] = 1;
			}
		} */
		//console.log(world);
		checkTrash();

		currentPath = [];
		updateRobotLocation(newpointsrobot);		// update the robot position
		//console.log(" Robot Position " + robotPosition);
		
		/* while (currentPath.length == 0){	// i think i need to use this in a separate function
			
			pathStart = robotPosition;
			pathEnd = [trachj[l],trachk[l];
			
			if (world[pathStart[0]][pathStart[1]] == 0){
				currentPath = findPath(world,pathStart,pathEnd);
			}else{
			}
		} */
		//console.log("Current Path is "+currentPath);
		
		redraw();
		startCleanTrash();
	}
	function startCleanTrash(){
		//i think i need to update this array currentPathArray after cleaning
		//i have the index of this array the lowest path currentPathArray(lowestOneIndex)
		// i need to update the robot position too
		
		var tNTrash = nearestTrash();
		
////////////////////////////////////////////////////////////		
//console.log('Current path length: '+currentPath.length);/
var cpav = currentPathArray[tNTrash[2]];
console.log("Path Array New Mean");
console.log(cpav);
for (rp=0; rp<cpav.length; rp++){
	switch(rp){
		case 0:
			spriteNum = 2; // start
			break;
		case cpav.length-1:
			spriteNum = 3; // end
			break;
		default:
			spriteNum = 4; // path node
			break;
	}

	ctx.drawImage(spritesheet,
	spriteNum*tileWidth, 0,
	tileWidth, tileHeight,
	cpav[rp][0]*tileWidth,
	cpav[rp][1]*tileHeight,
	tileWidth, tileHeight);
}
////////////////////////////////////////////////////////////////
		console.log(world);
		world[tNTrash[0]][tNTrash[1]] = 0;
		console.log("Nearest Trash is :");
		console.log(tNTrash);
		
		updateRobotLocation([tNTrash[0],tNTrash[1]]);
		
	}
	function updateRobotLocation(newRobotPosition){
		robotPosition = newRobotPosition;	// need to update when needed
	}
	function nearestTrash(){	// return index for lowestOneIndex which one is lowest
		//alert(robotPosition);
		pathStart = robotPosition;
		var nearestTrashIs = 0;
		var lowestOne = 100;		// dummy value may be  need to change 
		var lowestOneIndex = 0;		// dummy value may be  need to change 
		var trackIndexArr = 0;
		var trackIndex = [];
		
		for(var l=0;l<totalTrashes;l++){
			//count distance b.w robot current location and the all trashes that are in the array
			currentPathArray[l] = findPath(world,pathStart,[trachj[l],trachk[l]]);
			if(currentPathArray[l].length <= lowestOne){
				trackIndex[0] = trachj[l];
				trackIndex[1] = trachk[l];
				lowestOne = currentPathArray[l].length;
				lowestOneIndex = l;
				trackIndex[2] = lowestOneIndex;	// i think i need currentPathArray Index
				console.log("Path Array");
				console.log(currentPathArray[l]);
				
			}
		}
		var temp = currentPathArray[lowestOneIndex];
		temp.toString();
		$("#robotDirection").html(temp + " - ");
		return trackIndex;
	}
	function checkTrash(){	// should be use for remaining trashes count i think
		trachj = [];
		trachk = [];
		totalTrashes = 0;
		for(var j=0;j<worldWidth;j++){
			for(var k=0;k<worldHeight;k++){
				if(world[j][k] == 1){
					//alert(j+","+k);
					trachj.push(j);
					trachk.push(k);
					//var arr1 = j+","+k;
					//trashLocation[0].push(arr1);
					totalTrashes++;		//count plus total trashes in ground 
				}
			}
		}
		console.log("Trach Location is ");
		console.log(trashLocation);
	}
	function checkTrashForTotal(){
		trachj = [];
		trachk = [];
		totalTrashes = 0;
		for(var j=0;j<worldWidth;j++){
			for(var k=0;k<worldHeight;k++){
				if(world[j][k] == 1){
					//alert(j+","+k);
					trachj.push(j);
					trachk.push(k);
					//var arr1 = j+","+k;
					//trashLocation[0].push(arr1);
					totalTrashesTotal++;		//count plus total trashes in ground 
				}
			}
		}
		//console.log("Trach Location is ");
		//console.log(trashLocation);
	}
	function redraw(){
		if (!spritesheetLoaded) return;
		console.log('redrawing...');
		var spriteNum = 0;

		// clear the screen
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		for (var x=0; x < worldWidth; x++){
			for (var y=0; y < worldHeight; y++)	{
				// choose a sprite to draw
				switch(world[x][y]){
					case 1:
						spriteNum = 1;
						break;
					default:
						spriteNum = 0;
						break;
				}

				// draw it
				// ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
				ctx.drawImage(spritesheet,
				spriteNum*tileWidth, 0,
				tileWidth, tileHeight,
				x*tileWidth, y*tileHeight,
				tileWidth, tileHeight);
				//ctx.drawImage(img,x,y,width,height);
				//ctx.drawImage(spritesheet,x*tileWidth, y*tileHeight,tileWidth, tileHeight);
			}
		}
	}

	// Test Cases For var world = [[0,1,0,0,0,0],[0,0,0,1,0,0],[0,0,0,0,0,0],[0,0,1,0,1,0],[0,0,0,0,0,1],[1,0,0,0,0,0]];	//2d array grid
	
		//alert(totalTrashesTotal);
	/* for(var h=0;h<totalTrashesTotal;h++){
		//alert(robotPosition);
		//robotGround(robotPosition);
		setTimeout(function () {
			robotGround(robotPosition);
		  }, 3000);
	} */
	
	var h = 1;                     //  set your counter to 1
	
	function myLoop () {           //  create a loop function
		setTimeout(function () {    //  call a 3s setTimeout when the loop is called
			robotGround(robotPosition);          //  your code here
			h++;                     //  increment the counter
			if (h <= totalTrashesTotal) {            //  if the counter < 10, call the loop function
				myLoop();             //  ..  again which will trigger another 
			}                        //  ..  setTimeout()
		}, 4000)
	}

	//myLoop();
	
	function fnRobotPosition(rll){
		var partsOfStr = rll.split(',');
		init();
		//var inVal = document.getElementById('robotPosition').value;
		var inVal = new Object();
		inVal = [parseInt(partsOfStr[0]),parseInt(partsOfStr[1])];
		checkTrashForTotal();
		robotPosition = inVal;
		
		myLoop();
		console.log("Testing Path is ");
		console.log(currentPathArray);
	}
	function init(){
		//robotPosition = [0,0];
		world = [[0,1,0,0,0,0],[0,0,0,1,0,0],[0,0,0,0,0,0],[0,0,1,0,1,0],[0,0,0,0,0,1],[1,0,0,0,0,0]];	//2d array grid
		totalTrashes = 0;
		totalTrashesTotal = 0;
		trashLocation = [[]];	// i think this will not work 
		trachj = [];	//again
		trachk = [];	//again
		currentPathArray = [];
		//worldHeight = 6;
		//worldWidth = 6;
		//tileHeight = 32;
		//tileWidth = 32;
		//spritesheetLoaded = false;
		//pathStart = [worldWidth,worldHeight];
		//pathEnd = [0,0];
		//currentPath = [];

	}
	/* 
	robotGround([0,0]);
	robotGround([0,1]);
	robotGround([1,3]);
	robotGround([3,4]);
	robotGround([4,5]);
	robotGround([3,2]); 
	*/
	function imgLoad(){
		canvas = document.getElementById('robotGround');
		canvas.width = worldWidth * tileWidth;
		canvas.height = worldHeight * tileHeight;
		
		ctx = canvas.getContext("2d");
		
		spritesheet = new Image();
		spritesheet.src = 'http://epicanka.com/celib/code1/public/img/spritesheet.png';
		//spritesheet.src = 'img/spritesheet.png';
		robot = new Image();
		robot.src = 'img/robot.png';
		//alert(spritesheet.src);

		console.log('Spritesheet loaded.');
		spritesheetLoaded = true;
		
		console.log('Creating world...');
		redraw();
	}
	
	
	
	function findPath(world, pathStart, pathEnd)
{
	// shortcuts for speed
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	// the world data are integers:
	// anything higher than this number is considered blocked
	// this is handy is you use numbered sprites, more than one
	// of which is walkable road, grass, mud, etc
	var maxWalkableTileNum = 0;

	// keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square: 
	// it must have equal height and width. If your game world is rectangular, 
	// just fill the array with dummy values to pad the empty space.
	var worldWidth = world[0].length;
	var worldHeight = world.length;
	var worldSize =	worldWidth * worldHeight;

	// which heuristic should we use?
	// default: no diagonals (Manhattan)
	var distanceFunction = ManhattanDistance;
	var findNeighbours = function(){}; // empty

	/*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

	// distanceFunction functions
	// these return how far away a point is to another

	function ManhattanDistance(Point, Goal)
	{	// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}

	function DiagonalDistance(Point, Goal)
	{	// diagonal movement - assumes diag dist is 1, same as cardinals
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
	}

	function EuclideanDistance(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}

	// Neighbours functions, used by findNeighbours function
	// to locate adjacent available cells that aren't blocked

	// Returns every available North, South, East or West
	// cell that is empty. No diagonals,
	// unless distanceFunction function is not Manhattan
	function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	// returns every available North East, South East,
	// South West or North West cell - no squeezing through
	// "cracks" between two diagonals
	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
	{
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N});
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S});
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns every available North East, South East,
	// South West or North West cell including the times that
	// you would be squeezing through a "crack"
	function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
	{
		myN = N > -1;
		myS = S < worldHeight;
		myE = E < worldWidth;
		myW = W > -1;
		if(myE)
		{
			if(myN && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myS && canWalkHere(E, S))
			result.push({x:E, y:S});
		}
		if(myW)
		{
			if(myN && canWalkHere(W, N))
			result.push({x:W, y:N});
			if(myS && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns boolean value (world cell is available and open)
	function canWalkHere(x, y)
	{
		//var a = ((world[x] != null) && (world[x][y] != null) && (world[x][y] <= maxWalkableTileNum));
		//console.log(maxWalkableTileNum);
		return ((world[x] != null) && (world[x][y] != null));
	};

	// Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * worldWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
	}

	// Path function, executes AStar algorithm operations
	function calculatePath()
	{
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();

} // end of findPath() function
