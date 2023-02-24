function Mountain(x,y,size){
    this.x_pos=x;
    this.y_pos=y;
    this.size=size;
    this.draw=function(){
        fill(133, 146, 158);
        triangle(this.x_pos,this.y_pos,this.x_pos+100*this.size/100,this.y_pos,
        this.x_pos+50*this.size/100,this.y_pos-132*this.size/100);
    }
}