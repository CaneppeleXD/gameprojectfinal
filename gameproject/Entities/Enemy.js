function Enemy(x,y,size,speed,range){
    soundFormats("mp3");
    this.startX=x;
    this.pos_x=x;
    this.pos_y=y+4*size;
    this.width=8*size;
    this.speed=(speed/range)*10;
    this.height=18*size;
    this.range=range;
    this.size=size;
    this.alive=true;
    this.dieSound=loadSound("./Assets/ghostDie.mp3");
    this.draw=function(){
        fill(255,255,255,100);
        noStroke();
        arc(this.pos_x,this.pos_y-this.height/2,this.width,this.height,PI,2*PI, PIE);
        beginShape();
        vertex(this.pos_x-this.width/2,this.pos_y-this.height/2);
        vertex(this.pos_x-this.width/2+(this.width/8*1),this.pos_y-this.height/2+1.5*this.size);
        vertex(this.pos_x-this.width/2+(this.width/8*2),this.pos_y-this.height/2);
        vertex(this.pos_x-this.width/2+(this.width/8*3),this.pos_y-this.height/2+1.5*this.size);
        vertex(this.pos_x-this.width/2+(this.width/8*4),this.pos_y-this.height/2);
        vertex(this.pos_x-this.width/2+(this.width/8*5),this.pos_y-this.height/2+1.5*this.size);
        vertex(this.pos_x-this.width/2+(this.width/8*6),this.pos_y-this.height/2);
        vertex(this.pos_x-this.width/2+(this.width/8*7),this.pos_y-this.height/2+1.5*this.size);
        vertex(this.pos_x-this.width/2+(this.width/8*8),this.pos_y-this.height/2);
        vertex(this.pos_x-this.width/2,this.pos_y-this.height/2);
        endShape();
        fill(0);
        ellipse(this.pos_x-this.width/5,this.pos_y-this.height/1.4,5,5);
        ellipse(this.pos_x+this.width/5,this.pos_y-this.height/1.4,5,5);
    }

    this.update=function(){
        if ((this.range>0 ? this.startX+this.range<this.pos_x : this.startX+this.range>this.pos_x) || (this.range>0 ? this.pos_x<this.startX : this.pos_x>this.startX)) this.speed*=(-1);
        this.pos_x+=this.speed;
    }
    
    this.checkPlayerOnTop=function(gameChar){
        return this.checkCharX(gameChar.pos_x) && this.checkCharY(gameChar.pos_y);
    }
    this.checkCharX=function(x){
        return x>this.pos_x-this.width/2 && x<this.pos_x+this.width+2;
    }
    this.checkCharY=function(y){
        return y>this.pos_y-this.height-6 && y<this.pos_y-this.height+this.height/2;
    }
}