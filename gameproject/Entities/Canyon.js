function Canyon(x, width) {
    this.x_pos = x;
    this.width = width;
    
    this.draw = function (floorPos_y) {
        fill(120, 66, 18);
        rect(this.x_pos, floorPos_y, this.width, height);
    }

    this.checkCanyon=function(gameChar_x){
        return(gameChar_x<this.x_pos+this.width && gameChar_x>this.x_pos);
    }
}