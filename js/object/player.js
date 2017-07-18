function Player(xPos, yPos){
    this.initAtlasData("resource/CharAtlas.json");

	this.drawPos = { x : xPos, y : yPos }
    this.pos = {x : xPos, y : yPos}

    this.img = new Image();
    this.img.src = 'resource/CharAtlas.png';

    this.spriteName = "hero_idle_UP";
    this.spriteNum = 0;
}

Player.prototype = new Object();

Player.prototype.move = function (key){
	switch ( key ) {
        case 'left':
        	this.spriteName = "hero_walk_LEFT";
        	++this.spriteNum;

            if(this.pos.x > 0){
                --this.pos.x;
            }
            break;
        case 'right':
        	this.spriteName = "hero_walk_RIGHT";
        	++this.spriteNum;

            if(this.pos.x < COLS - 1){
                ++this.pos.x;
            }
            break;
        case 'down':
        	this.spriteName = "hero_walk_UP";
        	++this.spriteNum;

            if(this.pos.y < ROWS - 1){
                ++this.pos.y;
            }
            break;
        case 'up':
        	this.spriteName = "hero_walk_DOWN";
        	++this.spriteNum;

            if(this.pos.y > 0){
                --this.pos.y;
            }
            break;
    }
}

Player.prototype.draw = function (){   
    var success = this.drawSprite(this.spriteName + this.spriteNum);

    if(!success)
    {
        if(this.spriteNum != 0)
        {
            this.spriteNum = 0;
            this.draw();
        }
    }
}