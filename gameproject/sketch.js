/*

The Game Project 4


*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var collectables;
var canyons;
var trees_x;
var treePos_y;
var clouds
var cloud;
var mountains;
var cameraPosX;
var game_score;
var flagpole;
var lives;
var s;
var trees;
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives=3;
    startGame();

    s = new Square(width/2,height/2,200);
}

function draw()
{
	///////////DRAWING CODE//////////
    cameraPosX=gameChar_x - width/2;
    s.draw();   
	background(100,155,255); //fill the sky blue
    
    textSize(12);
    noStroke();
    fill(255);
    text("SCORE:"+game_score,50,20);
    text("LIVES:"+lives,50,40);  
    drawLifeTokens();
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    
    push();
    translate(-cameraPosX,0);
    
    //cloud
    drawClouds();
    
    //mountain
    drawMountains();
    
    //tree
    drawTrees();
    
	//collectable
    drawCollectables();
    
    //draw the canyon
    drawCanyons();
    
    //draw flagpole
    flagpole.draw();
    flagpole.checkFlagpoleIsReached();

	checkPlayerDie();
    
    //the game character
    
    if(isLeft && isFalling)
	{
		// add your jumping-left codew
        fill(46, 204, 113);
        rect(gameChar_x-5,gameChar_y-44,10,25);
        fill(250, 219, 216 );
        rect(gameChar_x-7, gameChar_y-66, 14, 25);
        fill(255,0,0);
        triangle(gameChar_x-12,gameChar_y-65,gameChar_x+12,gameChar_y-65,gameChar_x,gameChar_y-75);
        fill(0);
        rect(gameChar_x-11,gameChar_y-20,16,8);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(46, 204, 113);
        rect(gameChar_x-5,gameChar_y-44,10,25);
        fill(250, 219, 216 );
        rect(gameChar_x-7, gameChar_y-66, 14, 25);
        fill(255,0,0);
        triangle(gameChar_x-12,gameChar_y-65,gameChar_x+12,gameChar_y-65,gameChar_x,gameChar_y-75);
        fill(0);
        rect(gameChar_x-5,gameChar_y-20,16,8);

	}
	else if(isLeft)
	{
		// add your walking left code
        fill(46, 204, 113);
        rect(gameChar_x-5,gameChar_y-44,10,38);
        fill(250, 219, 216 );
        rect(gameChar_x-7, gameChar_y-66, 14, 25);
        fill(255,0,0);
        triangle(gameChar_x-12,gameChar_y-65,gameChar_x+12,gameChar_y-65,gameChar_x,gameChar_y-75);
        fill(0);
        rect(gameChar_x-11,gameChar_y-8,16,10);

	}
	else if(isRight)
	{
		// add your walking right code
        fill(46, 204, 113);
        rect(gameChar_x-5,gameChar_y-44,10,38);
        fill(250, 219, 216 );
        rect(gameChar_x-7, gameChar_y-66, 14, 25);
        fill(255,0,0);
        triangle(gameChar_x-12,gameChar_y-65,gameChar_x+12,gameChar_y-65,gameChar_x,gameChar_y-75);
        fill(0);
        rect(gameChar_x-5,gameChar_y-8,16,10);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(46, 204, 113);
        rect(gameChar_x-13,gameChar_y-44,26,25);
        fill(250, 219, 216 );
        ellipse(gameChar_x, gameChar_y-55, 25, 25);
        fill(0);
        ellipse(gameChar_x-5, gameChar_y-56, 4,4);
        fill(0);
        ellipse(gameChar_x+5, gameChar_y-56, 4,4);
        fill(255,0,0);
        triangle(gameChar_x-12,gameChar_y-65,gameChar_x+12,gameChar_y-65,gameChar_x,gameChar_y-75);
        fill(0);
        rect(gameChar_x-14,gameChar_y-20,10,12);
        fill(0);
        rect(gameChar_x+4,gameChar_y-20,10,12);

	}
	else
	{
		// add your standing front facing code
        fill(46, 204, 113);
        rect(gameChar_x-13,gameChar_y-44,26,38);
        fill(250, 219, 216 );
        ellipse(gameChar_x, gameChar_y-55, 25, 25);
        fill(0);
        ellipse(gameChar_x-5, gameChar_y-56, 4,4);
        fill(0);
        ellipse(gameChar_x+5, gameChar_y-56, 4,4);
        fill(255,0,0);
        triangle(gameChar_x-12,gameChar_y-65,gameChar_x+12,gameChar_y-65,gameChar_x,gameChar_y-75);
        fill(0);
        rect(gameChar_x-16,gameChar_y-8,12,10);
        fill(0);
        rect(gameChar_x+4,gameChar_y-8,12,10);

	}
    
     pop();

    if(lives==0){
        fill(255,0,0);
        textSize(50);
        text("Game over. Press space to continue",width/2-400,height/2);  
        return;
    }
    if(flagpole.isReached){
        fill(0,255,0);
        textSize(50);
        text("Level complete. Press space to continue",width/2-450,height/2);  
        return;
    }
    
    
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if (isLeft){
        gameChar_x-=5
    }
    else if (isRight){
        gameChar_x+=5
    }
    
    if (gameChar_y<floorPos_y){
        gameChar_y+=4;
        isFalling=true;
    }
    else{
        isFalling=false;
    }
    
    if (isPlummeting){
        gameChar_y+=10;
    }
}


function keyPressed()
{
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    if (!(isPlummeting||flagpole.isReached||lives==0)){
        if (keyCode == 39){
            isRight=true;
            console.log(isRight);
        }
        if (keyCode == 37){
            isLeft=true;
            console.log(isLeft);
        }
        if (keyCode == 87 && !isFalling){
            gameChar_y-=100;
        }
    }
    if(keyCode==32 && (flagpole.isReached||lives==0)){
        lives=3;
        startGame();
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    if (keyCode == 39){
        isRight=false;
        console.log(isRight);
    }
    if (keyCode == 37){
        isLeft=false;
        console.log(isLeft);
    }
}

function drawClouds(){
    for(var i = 0;i < clouds.length; i++){
        clouds[i].draw();
    }
}

function drawMountains(){
    for(var i = 0;i < mountains.length; i++){
        mountains[i].draw();
    }
}

function drawTrees(){
    for(var i = 0;i < trees.length; i++){
        trees[i].draw();
    }
}

function drawCollectables(){
    for (i = 0; i<collectables.length;i++){
        if(!collectables[i].isFound){
            collectables[i].draw();   
            collectables[i].checkCollectable(gameChar_x, gameChar_y);   
        }
    }
}

function drawCanyons(){
    for (i = 0; i<canyons.length;i++){
        canyons[i].draw(floorPos_y);
        if(canyons[i].checkCanyon()){
        isPlummeting=true;
        isLeft=false;
        isRight=false;
        }
    }
}

function checkPlayerDie(){
    if(gameChar_y>=height && lives>0){
        lives--;
        if(lives>0){
            startGame();
        }
    }
}

function drawLifeTokens(){
    for(var i=0;i<lives;i++){
        fill(255,0,0);
        circle(110+i*15,36,10);   
    }
}

function createCollectables(){
    return [new Collectable(90,410,100),new Collectable(700,410,100),new Collectable(1100,410,100)]
}

function createCanyons(){
    return [new Canyon(100,100),new Canyon(560,100),new Canyon(960,100)];
}

function createTrees(){
    return [new Tree(30,floorPos_y-200),new Tree(500,floorPos_y-200),new Tree(900,floorPos_y-200),new Tree(1300,floorPos_y-200)]
}

function createClouds(){
    return [new Cloud(200,120,120),new Cloud(600,80,150),new Cloud(1000,150,100)];
}

function createMountains(){
   return [new Mountain(210,floorPos_y,220),new Mountain(510,floorPos_y,220),new Mountain(810,floorPos_y,220)]; 
}

function startGame(){
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    collectables= createCollectables();
    
    canyons= createCanyons();
    
    trees = createTrees();

    clouds=createClouds();

    mountains= createMountains();

    flagpole= new Flagpole(1500);

    cameraPosX=0;
    game_score=0;
}

