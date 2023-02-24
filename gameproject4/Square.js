function Square(x,y,size){
    this.x=x;
    this.y=y;
    this.size=size;
    this.draw = function(){
        fill(0);
        rect(x,y,size,size);
    }
}