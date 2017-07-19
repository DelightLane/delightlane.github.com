function TriggerObject(pos, player, img, triggerEvent){
	PlaceObject.apply(this, arguments);

	this.img = img;

	this.triggerEvent = triggerEvent;

	this.obstacle = false;
}

TriggerObject.prototype = new PlaceObject();

TriggerObject.prototype.isObstacle = function(){
	return this.obstacle;
}