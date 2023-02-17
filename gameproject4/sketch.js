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
    cameraPosX=gameChar_x - width/2;
    
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
    for (i = 0; i<collectables.length;i++){
        if(!collectables[i].isFound){
            drawCollectable(collectables[i]);   
            checkCollectable(collectables[i]);   
        }
    }
    
    //draw the canyon
    for (i = 0; i<canyons.length;i++){
        drawCanyon(canyons[i]);
        if(gameChar_x<canyons[i].x_pos+canyons[i].width && gameChar_x>canyons[i].x_pos && !isFalling){
        isPlummeting=true;
        isLeft=false;
        isRight=false;
        }
    }
    
    //draw flagpole
    renderFlagPole();
    checkFlagpoleIsReached();

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
        fill(250,250,250);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, 80*(clouds[i].size/100), 80*(clouds[i].size/100));
        ellipse(clouds[i].x_pos-40*(clouds[i].size/100), clouds[i].y_pos, 60*(clouds[i].size/100), 60*(clouds[i].size/100));
        ellipse(clouds[i].x_pos+40*(clouds[i].size/100), clouds[i].y_pos, 60*(clouds[i].size/100), 60*(clouds[i].size/100));
    }
}

function drawMountains(){
    for(var i = 0;i < mountains.length; i++){
        fill(133, 146, 158);
        triangle(mountains[i].x_pos,mountains[i].y_pos,mountains[i].x_pos+100*mountains[i].size/100,mountains[i].y_pos,mountains[i].x_pos+50*mountains[i].size/100,mountains[i].y_pos-132*mountains[i].size/100);
    }
}

function drawTrees(){
    for(var i = 0;i < trees_x.length; i++){
        fill(147,81,22);
        rect(trees_x[i],treePos_y,60,200);
        fill(0,120,0);
        triangle(trees_x[i]-55,treePos_y+68,trees_x[i]+115,treePos_y+68,trees_x[i]+30,treePos_y-50);
        fill(0,120,0);
        triangle(trees_x[i]-45,treePos_y-2,trees_x[i]+105,treePos_y-2,trees_x[i]+30,treePos_y-100);
    }
}

function drawCollectable(t_collectable){
    if (t_collectable.isFound==false){
        fill(255, 166, 10);
        ellipse(t_collectable.x_pos,t_collectable.y_pos,25*(t_collectable.size/100),25*(t_collectable.size/100));
        fill(0,100,0);
        triangle(t_collectable.x_pos+5,t_collectable.y_pos,t_collectable.x_pos,t_collectable.y_pos-20,t_collectable.x_pos+20,t_collectable.y_pos-15);   
    }
}

function drawCanyon(t_canyon){
    fill(120, 66, 18);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width,height);
}

function checkCollectable(t_collectable){
    if (dist(gameChar_x,gameChar_y,collectables[i].x_pos,collectables[i].y_pos)<50){
            collectables[i].isFound=true;
            game_score++;
    }
}

function  renderFlagPole(){
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos,floorPos_y,flagpole.x_pos,floorPos_y-250);
    noStroke();
    fill(0);
    if (flagpole.isReached){
        rect(flagpole.x_pos,floorPos_y-250,80,50);    
        fill(0,150,0);
        rect(flagpole.x_pos,floorPos_y-250,80,50);
        fill(255,255,0);
        triangle(flagpole.x_pos,floorPos_y-225,flagpole.x_pos+40,floorPos_y-250,flagpole.x_pos+40,floorPos_y-200);
        triangle(flagpole.x_pos+80,floorPos_y-225,flagpole.x_pos+40,floorPos_y-250,flagpole.x_pos+40,floorPos_y-200);
        fill(0,0,255);
        circle(flagpole.x_pos+40,floorPos_y-225,22);
    }
    else{
        fill(0,180,0);
        rect(flagpole.x_pos,floorPos_y-50,80,50);
        fill(255,255,0);
        triangle(flagpole.x_pos,floorPos_y-25,flagpole.x_pos+40,floorPos_y-50,flagpole.x_pos+40,floorPos_y);
        triangle(flagpole.x_pos+80,floorPos_y-25,flagpole.x_pos+40,floorPos_y-50,flagpole.x_pos+40,floorPos_y);
        fill(0,0,255);
        circle(flagpole.x_pos+40,floorPos_y-25,22);
    }
    
}

function checkFlagpoleIsReached(){
    if(abs(gameChar_x-flagpole.x_pos)<10){
        flagpole.isReached=true;
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

function startGame(){
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    collectables= [
        {
        x_pos: 90, 
        y_pos: 410, 
        size: 100,
        isFound: false
        },
        {
        x_pos: 700, 
        y_pos: 410, 
        size: 100,
        isFound: false
        },
        {
        x_pos: 1100, 
        y_pos: 410, 
        size: 100,
        isFound: false
        }
    ];
    
    canyons= [
        {
        x_pos: 100, 
        width: 100
        },
        {
        x_pos: 560, 
        width: 100
        },
        {
        x_pos: 960, 
        width: 100
        },
    ];
    trees_x=[30,500,900,1300];
    treePos_y=floorPos_y-200;
    clouds=[
        {
            x_pos: 200, 
            y_pos: 120, 
            size: 120    
        },
        {
            x_pos: 600, 
            y_pos: 80, 
            size: 150    
        },
        {
            x_pos: 1000, 
            y_pos: 150, 
            size: 100    
        }
    ];
    mountains= [
        {
            x_pos: 210, 
            y_pos: floorPos_y, 
            size: 220
        },
        {
            x_pos: 510, 
            y_pos: floorPos_y, 
            size: 220
        },
        {
            x_pos: 810, 
            y_pos: floorPos_y, 
            size: 220
        }
    ];
    cameraPosX=0;
    game_score=0;
    flagpole={
        isReached:false,
        x_pos:1500
    }
}