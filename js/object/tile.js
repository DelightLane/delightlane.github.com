var tileType = Math.floor(Math.random() * 10 % 3);

function Tile(xPos, yPos, playerXPos, playerYPos){
	PlaceObject.apply(this, arguments);

	this.img = new Image();

	this.setType("tile");

	this.img.src = "resource/" + tileName + ".png";
}

Tile.prototype = new PlaceObject();

Tile.prototype.setType = function(type){
	var tileName;

	if(type == "tile")
	{
		tileName = "tile" + tileType;
	}
	else if(type == "road")
	{
		tileName = "road";
	}

	this.img.src = "resource/" + tileName + ".png";
}