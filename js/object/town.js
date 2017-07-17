function Town(xPos, yPos, playerXPos, playerYPos, triggerEvent){
	PlaceObject.apply(this, arguments);

	var resName = "house" + Math.floor(Math.random() * 10 % 2);

	this.img = new Image();
	this.img.src = "resource/" + resName + ".png";

	this.triggerEvent = triggerEvent;
}

Town.prototype = new PlaceObject();