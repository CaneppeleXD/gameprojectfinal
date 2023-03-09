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
var loseSound;
var platforms;
var enemies;
var levelSize;

function preload(){
    soundFormats("mp3");
    loseSound=loadSound("./Assets/loseSound.mp3");
}
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    levelSize = 4800;
    startGame();
}

function draw()
{
    cameraPosX=gameChar.pos_x - width/2;
	background(100,155,255);
    
    textSize(12);
    noStroke();
    fill(255);
    text("SCORE:"+game_score,50,20);
    text("LIVES:"+gameChar.lives,50,40);  
    drawLifeTokens();
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y);
    
    
    push();
    translate(-cameraPosX,0);
    
    drawClouds();
    
    drawMountains();
    
    drawTrees();
    
    drawCollectables();
    
    drawCanyons();
    
    flagpole.draw();
    flagpole.checkFlagpoleIsReached(gameChar.pos_x);

    drawPlatForms();

    drawEnemies();

	checkPlayerDie();
    
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
    gameChar = new GameChar(width/2,floorPos_y,gameChar==null ? 3 : gameChar.lives, 5);
    
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    if(gameChar.lives==0 || gameChar.lives==3){
        collectables = createCollectables();
        
        canyons = createCanyons();
        
        trees = createTrees();

        clouds = createClouds();

        mountains = createMountains();

        platforms = createPlatforms();

        enemies = createEnemies();
    }    
    flagpole= new Flagpole(levelSize*0.80);

    game_score = 0;

    cameraPosX = 0;
    
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

function drawPlatForms(){
    for(var i = 0;i < platforms.length; i++){
        platforms[i].draw();
    }  
}

function drawEnemies(){
    for(var i = 0;i < enemies.length; i++){
        enemies[i].update();
        if(enemies[i].checkPlayerOnTop(gameChar)){
            if(enemies[i].alive) enemies[i].dieSound.play(); 
            enemies[i].alive=false;
        }
        if(enemies[i].alive) enemies[i].draw();
    }  
}

function checkPlayerTouchEnemy(){
    for(var i = 0;i < enemies.length; i++){
        if(enemies[i].checkCharX(gameChar.pos_x) && !gameChar.state[gameChar.FALLING] && enemies[i].alive) return true;
    }  
    return false;
}

function checkPlayerDie(){
    if(gameChar.lives>0 && (gameChar.pos_y>=height || checkPlayerTouchEnemy())){
        gameChar.lives--;
        gameChar.deathSound.play();
        if(gameChar.lives>0){
            startGame();
        }
        else loseSound.play();
    }
    return false;
}

function checkPlatform(gameChar){
    for(var i=0;i<platforms.length;i++){
        if (platforms[i].checkPlayerOnTop(gameChar)){
            return true;
        }
    }
    return false;
}

function drawLifeTokens(){
    for(var i=0;i<gameChar.lives;i++){
        fill(255,0,0);
        circle(110+i*15,36,10);   
    }
}

function createCollectables(){
    return [new Collectable(90,410,100),new Collectable(700,410,100),new Collectable(1100,410,100)]
}

function createCanyons(){
    return [new Canyon(0,300),new Canyon(560,100),new Canyon(960,100),new Canyon(1300,100),new Canyon(1500,100),new Canyon(1900,100),new Canyon(2100,100),new Canyon(2300,600),new Canyon(3000,100),new Canyon(3300,100),new Canyon(3500,100)];
}

function createTrees(){
    var trees= [];
    for(var i = 0;i<levelSize/500; i++ ){
        trees.push(new Tree(30+500*i,floorPos_y-200));
    }
    return trees;
}

function createClouds(){
    var clouds = [];
    for(var i = 0;i<levelSize/400; i++ ){
        clouds.push(new Cloud(200+400*i,random(80,150),random(100,150)));
    }
    return clouds;
}

function createMountains(){
    var mountains= [];
    for(var i = 0;i<levelSize/300; i++ ){
        mountains.push(new Mountain(210+300*i,floorPos_y,random(150,300)));
    }
    return mountains;
}

function createPlatforms(){
    return [new Platform(2350,floorPos_y-60,100), new Platform(2350,floorPos_y-60,100), new Platform(2550,floorPos_y-60,80), new Platform(2750,floorPos_y-60,60)]
}

function createEnemies(){
    return [new Enemy(400,floorPos_y,4,6,50)]
}

