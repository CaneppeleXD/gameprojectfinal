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
var gameChar;
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives=3;
    startGame();
}

function draw()
{
	///////////DRAWING CODE//////////
    cameraPosX=gameChar.pos_x - width/2;
	background(100,155,255); //fill the sky blue
    
    textSize(12);
    noStroke();
    fill(255);
    text("SCORE:"+game_score,50,20);
    text("LIVES:"+gameChar.lives,50,40);  
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
    flagpole.checkFlagpoleIsReached(gameChar.pos_x);

	checkPlayerDie();
    
    //the game character
    gameChar.draw();
    
    pop();

    if(gameChar.lives==0){
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

    if(!flagpole.isReached) gameChar.update();
}

function startGame(){
    gameChar = new GameChar(width/2,floorPos_y,gameChar==null ? 3 : gameChar.lives);
    
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

function keyPressed()
{
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    if(!flagpole.isReached) gameChar.keyPressed(keyCode);
    if(keyCode==32 && (flagpole.isReached||gameChar.lives==0)){
        startGame();
        gameChar.lives=3;
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    if(!flagpole.isReached) gameChar.keyReleased(keyCode);
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
            collectables[i].checkCollectable(gameChar.pos_x, gameChar.pos_y);   
        }
    }
}

function drawCanyons(){
    for (i = 0; i<canyons.length;i++){
        canyons[i].draw(floorPos_y);
        if(canyons[i].checkCanyon(gameChar.pos_x)){
            gameChar.canyonFall();
        }
    }
}

function checkPlayerDie(){
    if(gameChar.pos_y>=height && gameChar.lives>0){
        gameChar.lives--;
        if(gameChar.lives>0){
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

