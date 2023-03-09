function Platform(x,y,width){
    soundFormats("mp3");
    this.pos_x=x;
    this.pos_y=y;
    this.width=width;
    this.draw=function(){
        fill(255,255,0);
        rect(x,y,width,20);
    }
    this.checkPlayerOnTop=function(gameChar){
        return this.checkCharX(gameChar.pos_x) && this.checkCharY(gameChar.pos_y);
    }
    this.checkCharX=function(x){
        return x>this.pos_x-5 && x<this.pos_x+width+5;
    }
    this.checkCharY=function(y){
        return y>this.pos_y-8 && y<this.pos_y;
    }
}