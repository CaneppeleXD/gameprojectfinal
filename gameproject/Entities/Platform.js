function Platform(x,y,width){
    soundFormats("mp3");
    this.pos_x=x;
    this.pos_y=y;
    this.width=width;
    this.draw=function(){
        fill(255,255,0);
        rect(x,y,width,20);
    }
}