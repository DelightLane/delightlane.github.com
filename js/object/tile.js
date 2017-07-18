var tileType = Math.floor(Math.random() * 10 % 3);

function Tile(xPos, yPos, playerXPos, playerYPos){
	PlaceObject.apply(this, arguments);

	this.img = new Image();

	this.setType("tile");
}

Tile.prototype = new PlaceObject();

Tile.prototype.setType = function(tileName){
	if(tileName == "tile")
	{
		tileName = "tile" + tileType;
	}
	else
	{
		tileName = tileName;
	}

	this.img.src = "resource/" + tileName + ".png";
}