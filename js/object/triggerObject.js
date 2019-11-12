function TriggerObject(data, player, img, triggerEvent){
	PlaceObject.apply(this, [ data, player ]);

	this.data = data;

	this.img = img;
	this.triggerEvent = triggerEvent;
	this.obstacle = data.obstacle;
}

TriggerObject.prototype = new PlaceObject();