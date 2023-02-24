function Cloud(x,y,size){
    this.x_pos=x;
    this.y_pos=y;
    this.size=size;
    this.draw=function(){
        fill(250,250,250);
        ellipse(this.x_pos, this.y_pos, 80*(this.size/100), 80*(this.size/100));
        ellipse(this.x_pos-40*(this.size/100), this.y_pos, 60*(this.size/100), 60*(this.size/100));
        ellipse(this.x_pos+40*(this.size/100), this.y_pos, 60*(this.size/100), 60*(this.size/100));
    }
}