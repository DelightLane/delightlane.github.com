var MOVE_SPEED = 1;

function PlaceObject(pos, player, tileset, gid){
    if(pos != null && player != null){
    	this.drawPos = { 
            x : pos.x + (player.drawPos.x - player.pos.x),
            y : pos.y + (player.drawPos.y - player.pos.y)
        }
    	this.pos = { x : pos.x, y : pos.y };

    	this.interval = { x : -player.pos.x, y : -player.pos.y };
    }

    if(tileset != null && gid != null){
        // 타일셋 셋팅    
        this.img = new Image();
        this.imgState = "none";
        this.tileset = tileset;
        this.gid = gid - this.tileset.firstGid + 1;
    }


    this.triggerEvent = null;
}

PlaceObject.prototype = new Object();

PlaceObject.prototype.isObstacle = function(){
    return this.obstacle;
}

PlaceObject.prototype.isFromTileset = function(){
    return this.tileset != null;
}

PlaceObject.prototype.drawFromTileset = function(){

    if(!this.isFromTileset())
        return false;

    if(this.tileset.imgPath != null && this.imgState == "none"){
        this.imgState = "loading";
        this.img.src = this.tileset.imgPath;
        var thisRef = this;
        this.img.onload = function(){
            thisRef.imgState = "loaded"; 
        };
    }

    this.imgWidth = this.tileset.width;
    this.imgHeight = this.tileset.height;

    if(this.calcCanvasPos()){
        Object.drawImage(this.img, this.tileset.getDrawInfo(this.calcX, this.calcY, this.gid));
    }

    return true;
}

PlaceObject.prototype.draw = function (){   
    var isFromTileset = this.drawFromTileset();

    if(!isFromTileset)
        this.drawSprite(this.spriteName);
}

PlaceObject.prototype.move = function (key, isTrigger){
    if(isTrigger && this.obstacle){
        if(this.triggerEvent != null){
            this.triggerEvent();
        }

        return;
    }

	switch ( key ) {
        case 'left':
        	if(this.interval.x != 0){
        		this.interval.x += MOVE_SPEED;
     	    	this.drawPos.x += MOVE_SPEED;
     		}
            break;
        case 'right':
        	if(this.interval.x != -(COLS - 1)){
        		this.interval.x -= MOVE_SPEED;
        		this.drawPos.x -= MOVE_SPEED;
        	}
            break;
        case 'down':
        	if(this.interval.y != -(ROWS - 1)){
        		this.interval.y -= MOVE_SPEED;
        		this.drawPos.y -= MOVE_SPEED;
        	}
            break;
        case 'up':
        	if(this.interval.y != 0){
        		this.interval.y += MOVE_SPEED;
        		this.drawPos.y += MOVE_SPEED;
        	}
            break;
    }

    if(isTrigger && this.triggerEvent != null){
        this.triggerEvent();
    }
}