
function GameChar(x,y,lives,speed){
    soundFormats("mp3");
    //Possible Char States
    this.STANDING=0;
    this.LEFT=1;
    this.RIGHT=2;
    this.FALLING=3;
    this.PLUMMETING=4;
    //--------------------
    this.pos_x=x;
    this.pos_y=y;
    this.lives=lives;
    this.floorPos=y;
    this.speed=speed;
    this.state=[true,false,false,false];
    this.jumpSound=loadSound("./Assets/jump.mp3");
    this.deathSound=loadSound("./Assets/deathSound.mp3");

    this.draw=function(){
        if(this.state[this.LEFT]) this.drawLeft();
        else if(this.state[this.RIGHT]) this.drawRight();
        else if(this.state[this.LEFT] && this.state[this.FALLING]) this.drawJumpLeft();
        else if(this.state[this.RIGHT] && this.state[this.FALLING]) this.drawJumpRight(); 
        else if(this.state[this.FALLING] || this.state[this.PLUMMETING]) this.drawFalling();
        else this.drawStanding();
    }

    this.drawLeft=function(){
        fill(46, 204, 113);
        rect(this.pos_x-5,this.pos_y-44,10,38);
        fill(250, 219, 216 );
        rect(this.pos_x-7, this.pos_y-66, 14, 25);
        fill(255,0,0);
        triangle(this.pos_x-12,this.pos_y-65,this.pos_x+12,this.pos_y-65,this.pos_x,this.pos_y-75);
        fill(0);
        rect(this.pos_x-11,this.pos_y-8,16,10);
    }
    this.drawRight=function(){
        fill(46, 204, 113);
        rect(this.pos_x-5,this.pos_y-44,10,38);
        fill(250, 219, 216 );
        rect(this.pos_x-7, this.pos_y-66, 14, 25);
        fill(255,0,0);
        triangle(this.pos_x-12,this.pos_y-65,this.pos_x+12,this.pos_y-65,this.pos_x,this.pos_y-75);
        fill(0);
        rect(this.pos_x-5,this.pos_y-8,16,10);
    }
    this.drawFalling=function(){
        fill(46, 204, 113);
        rect(this.pos_x-13,this.pos_y-44,26,25);
        fill(250, 219, 216 );
        ellipse(this.pos_x, this.pos_y-55, 25, 25);
        fill(0);
        ellipse(this.pos_x-5, this.pos_y-56, 4,4);
        fill(0);
        ellipse(this.pos_x+5, this.pos_y-56, 4,4);
        fill(255,0,0);
        triangle(this.pos_x-12,this.pos_y-65,this.pos_x+12,this.pos_y-65,this.pos_x,this.pos_y-75);
        fill(0);
        rect(this.pos_x-14,this.pos_y-20,10,12);
        fill(0);
        rect(this.pos_x+4,this.pos_y-20,10,12);
    }
    this.drawJumpLeft=function(){
        fill(46, 204, 113);
        rect(this.pos_x-5,this.pos_y-44,10,25);
        fill(250, 219, 216 );
        rect(this.pos_x-7, this.pos_y-66, 14, 25);
        fill(255,0,0);
        triangle(this.pos_x-12,this.pos_y-65,this.pos_x+12,this.pos_y-65,this.pos_x,this.pos_y-75);
        fill(0);
        rect(this.pos_x-11,this.pos_y-20,16,8);
    }
    this.drawJumpRight=function(){
        fill(46, 204, 113);
        rect(this.pos_x-5,this.pos_y-44,10,25);
        fill(250, 219, 216 );
        rect(this.pos_x-7, this.pos_y-66, 14, 25);
        fill(255,0,0);
        triangle(this.pos_x-12,this.pos_y-65,this.pos_x+12,this.pos_y-65,this.pos_x,this.pos_y-75);
        fill(0);
        rect(this.pos_x-5,this.pos_y-20,16,8);
    }
    this.drawStanding=function(){
        fill(46, 204, 113);
        rect(this.pos_x-13,this.pos_y-44,26,38);
        fill(250, 219, 216 );
        ellipse(this.pos_x, this.pos_y-55, 25, 25);
        fill(0);
        ellipse(this.pos_x-5, this.pos_y-56, 4,4);
        fill(0);
        ellipse(this.pos_x+5, this.pos_y-56, 4,4);
        fill(255,0,0);
        triangle(this.pos_x-12,this.pos_y-65,this.pos_x+12,this.pos_y-65,this.pos_x,this.pos_y-75);
        fill(0);
        rect(this.pos_x-16,this.pos_y-8,12,10);
        fill(0);
        rect(this.pos_x+4,this.pos_y-8,12,10);
    }

    this.update=function(){
        if(this.state[this.LEFT]) this.pos_x-=this.speed;
        else if(this.state[this.RIGHT]) this.pos_x+=this.speed;
        
        if(this.pos_y<this.floorPos && !checkPlatform(this)) {
            this.pos_y+=this.speed*0.8;
            this.state[this.FALLING]=true;
        }
        else this.state[this.FALLING]=false;
        
        if(this.state[this.PLUMMETING]) {
            this.pos_y+=10;
        }
    }

    this.keyPressed=function(keyCode){
        if (!(this.state[this.PLUMMETING]||this.lives==0)){
            if (keyCode == 39){
                this.state[this.RIGHT]=true;
            }
            if (keyCode == 37){
                this.state[this.LEFT]=true;
            }
            if (keyCode == 87 && !this.state[this.FALLING] && !this.state[this.PLUMMETING]){
                this.jumpSound.play();
                this.pos_y-=120;
                this.state[this.FALLING]=true;
            }
        }
    }

    this.keyReleased=function(keyCode){
        if (keyCode == 39){
            this.state[this.RIGHT]=false;
        }
        if (keyCode == 37){
            this.state[this.LEFT]=false;
        }
    }

    this.canyonFall=function(){
        if(!this.state[this.FALLING] && !checkPlatform(this)){
            this.state[this.PLUMMETING]=true;
            this.state[this.LEFT]=false;
            this.state[this.RIGHT]=false;
        }
    }
}