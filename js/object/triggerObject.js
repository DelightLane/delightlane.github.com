function TriggerObject(data, player, img, triggerEvent){
	PlaceObject.apply(this, arguments);

	this.img = img;

	this.data = data;

	this.triggerEvent = triggerEvent;

	this.obstacle = data.obstacle;
}

TriggerObject.prototype = new PlaceObject();

TriggerObject.prototype.isObstacle = function(){
	return this.obstacle;
}