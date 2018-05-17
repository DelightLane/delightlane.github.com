var tileType = Math.floor(Math.random() * 10 % 3);

function Tile(pos, player, tileName){
	PlaceObject.apply(this, arguments);

	this.img = new Image();

	if(tileName != null && tileName.length > 0)
	{
		this.setType(tileName);
	}
	else
	{
		this.setType("tile");
	}
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

	this.img.src = SITE_URL + "resource/" + tileName + ".png";
}

Tile.prototype.draw = function (){   
    this.drawSprite(this.spriteName);
    //ctx.strokeStyle = "#353535";
    //ctx.lineWidth = 1.5;
    //ctx.strokeRect(this.calcX, this.calcY, this.imgWidth, this.imgHeight);
}