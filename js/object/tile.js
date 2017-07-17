var tileType = Math.floor(Math.random() * 10 % 3);

function Tile(xPos, yPos, playerXPos, playerYPos){
	PlaceObject.apply(this, arguments);

	this.img = new Image();

	var tileName = "tile" + tileType;
	if(Math.floor(Math.random() > 0.75))
	{
		tileName = "road";
	}

	this.img.src = "resource/" + tileName + ".png";
}

Tile.prototype = new PlaceObject();