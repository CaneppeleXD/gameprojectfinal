function Flagpole(x){
    this.x_pos=x;
    this.isReached=false;

    this.draw=function(){
        strokeWeight(5);
        stroke(100);
        line(this.x_pos,floorPos_y,this.x_pos,floorPos_y-250);
        noStroke();
        fill(0);
        if (this.isReached){
            rect(this.x_pos,floorPos_y-250,80,50);    
            fill(0,150,0);
            rect(this.x_pos,floorPos_y-250,80,50);
            fill(255,255,0);
            triangle(this.x_pos,floorPos_y-225,this.x_pos+40,floorPos_y-250,this.x_pos+40,floorPos_y-200);
            triangle(this.x_pos+80,floorPos_y-225,this.x_pos+40,floorPos_y-250,this.x_pos+40,floorPos_y-200);
            fill(0,0,255);
            circle(this.x_pos+40,floorPos_y-225,22);
        }
        else{
            fill(0,180,0);
            rect(this.x_pos,floorPos_y-50,80,50);
            fill(255,255,0);
            triangle(this.x_pos,floorPos_y-25,this.x_pos+40,floorPos_y-50,this.x_pos+40,floorPos_y);
            triangle(this.x_pos+80,floorPos_y-25,this.x_pos+40,floorPos_y-50,this.x_pos+40,floorPos_y);
            fill(0,0,255);
            circle(this.x_pos+40,floorPos_y-25,22);
        }
    }

    this.checkFlagpoleIsReached=function(gameChar_x){
        if(abs(gameChar_x-flagpole.x_pos)<10){
            flagpole.isReached=true;
        }
    }
}