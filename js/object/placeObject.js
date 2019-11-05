var MOVE_SPEED = 1;

function PlaceObject(pos, player){
    if(pos != null && player != null)
    {
    	this.drawPos = { x : pos.x + (player.drawPos.x - player.pos.x), y : pos.y + (player.drawPos.y - player.pos.y)};
    	this.pos = { x : pos.x, y : pos.y };

    	this.interval = { x : -player.pos.x, y : -player.pos.y };
    }

    this.triggerEvent = null;
}

PlaceObject.prototype = new Object();

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

    if(isTrigger && this.triggerEvent != null)
    {
        this.triggerEvent();
    }
}