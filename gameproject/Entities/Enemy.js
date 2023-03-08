function Enemy(x,y,size,speed,range){
    soundFormats("mp3");
    this.pos_x=x;
    this.pos_y=y;
    this.width=10*size;
    this.speed=(speed/range)*10;
    this.height=10*size;
    this.range=range;
    this.draw=function(){
        fill(255,255,255,100);
        rect(this.pos_x,this.pos_y,this.width,this.height*(-1));
    }
    
    this.checkPlayerOnTop=function(gameChar){
        return this.checkCharX(gameChar.pos_x) && this.checkCharY(gameChar.pos_y);
    }
    this.checkCharX=function(x){
        return x>this.pos_x && x<this.pos_x+width;
    }
    this.checkCharY=function(y){
        return y>this.pos_y-8 && y<this.pos_y;
    }
}