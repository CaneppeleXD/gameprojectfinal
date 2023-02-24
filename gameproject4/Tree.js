function Tree(x,y){
    this.x_pos=x;
    this.y_pos=y;
    this.draw=function(){
        fill(147,81,22);
        rect(this.x_pos,this.y_pos,60,200);
        fill(0,120,0);
        triangle(this.x_pos-55,this.y_pos+68,this.x_pos+115,this.y_pos+68,this.x_pos+30,this.y_pos-50);
        fill(0,120,0);
        triangle(this.x_pos-45,this.y_pos-2,this.x_pos+105,this.y_pos-2,this.x_pos+30,this.y_pos-100);
    }
}