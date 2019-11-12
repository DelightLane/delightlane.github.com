var tileType = Math.floor(Math.random() * 10 % 3);

function Tile(){
	var legacyType = function(pos, player, tileName){
		PlaceObject.apply(this, [ pos, player ]);

		this.img = new Image();

		if(tileName != null && tileName.length > 0){
			this.setType(tileName);
		}
		else{
			this.setType("tile");
		}
	};

	var newType = function(pos, player, tileset, gid){
		console.log("new Tile")
		PlaceObject.apply(this, arguments);
	}
	////////////////////////////



	if(arguments.length == 3){
		legacyType.apply(this, arguments);
	}
	else if(arguments.length == 4){
		newType.apply(this, arguments);
	}
}

Tile.prototype = new PlaceObject();

Tile.prototype.setType = function(tileName){
	if(tileName == "tile"){
		tileName = "tile" + tileType;
	}
	else{
		tileName = tileName;
	}

	this.img.src = SITE_URL + "resource/" + tileName + ".png";
}