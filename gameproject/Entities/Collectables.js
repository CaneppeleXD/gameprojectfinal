function Collectable(x,y,size){
    soundFormats("mp3");
    this.x_pos=x;
    this.y_pos=y;
    this.size=size;
    this.isFound=false;
    this.isFoundSound=loadSound("../assets/item.mp3");
    this.draw=function(){
        if (this.isFound==false){
            fill(255, 166, 10);
            ellipse(this.x_pos,this.y_pos,25*(this.size/100),25*(this.size/100));
            fill(0,100,0);
            triangle(this.x_pos+5,this.y_pos,this.x_pos,this.y_pos-20,this.x_pos+20,this.y_pos-15);   
        }
    }

    this.checkCollectable=function(gameChar_x,gameChar_y){
        if (dist(gameChar_x,gameChar_y,collectables[i].x_pos,collectables[i].y_pos)<50){
            if (!this.isFound) this.isFoundSound.play(); 
            this.isFound=true;
            game_score++;
        }
    }
}