var DRAW_SCALE = 2;

function getJson(url, callback) {
    var request = new XMLHttpRequest();
   	request.open("GET", url, true);
   	request.addEventListener("readystatechange", function() {
 		if (request.readyState === 4){
 			if(request.status === 200 || request.status == 0) {
 				callback(JSON.parse(request.responseText));
 			}
  		}
	}, false);
	request.send(null);
}

function Object(){
	this.img = null;

    this.drawPos = { x : 0, y : 0 }

    this.offset = { x : 2, y : 2 }
}

Object.prototype.resCreator = function(resName){
    if(resName && resName.length > 0){
        var img = new Image();
        img.src = SITE_URL + "/resource/" + resName + ".png";
        return img;
    }

    return null;
};

Object.prototype.initAtlasData = function(atlasName){
	var closureThis = this;
	getJson(atlasName, function(atlasdata){
		closureThis.atlasData = atlasdata;
	});
}

Object.prototype.calcCanvasPos = function(){
	if(this.imgWidth > 0 && this.imgHeight > 0)
	{
		WIDTH_MARGIN = (canvas.width - (this.imgWidth * COLS)) / 2;
		HEIGHT_MARGIN = (canvas.height - (this.imgHeight * ROWS)) / 2;

		this.calcX = this.drawPos.x * (this.imgWidth - this.offset.x) + WIDTH_MARGIN;
		this.calcY = this.drawPos.y * (this.imgHeight - this.offset.y) + HEIGHT_MARGIN;

		return true;
	}

	return false;
}

Object.drawImage = function(img, inits){
	// inits : offsetX, offsetY, cropWidth, cropHeight, posX, posY, width, height

	// turn off image anti aliasing
	ctx.msImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(img, inits.offsetX, inits.offsetY, inits.cropWidth, inits.cropHeight, inits.posX, inits.posY, inits.width, inits.height);
}

Object.prototype.drawSprite = function(spriteName){
	if(!this.img){
		return;
	}

	if(typeof(this.atlasData) == 'undefined'){
		this.imgWidth = this.img.width * DRAW_SCALE;
		this.imgHeight = this.img.height * DRAW_SCALE;

		if(this.calcCanvasPos()){
			Object.drawImage(this.img, 
				{
					offsetX: 0,
					offsetY: 0,
					cropWidth: this.img.width,
					cropHeight: this.img.height,
					posX: this.calcX,
					posY: this.calcY,
					width: this.imgWidth,
					height: this.imgHeight
				});
		}
	}
	else{
		var success = false;

		for(var i in this.atlasData.infos){
			if(this.atlasData.infos[i].imageName == spriteName){
				this.lastAtlasInfo = this.atlasData.infos[i];
				success = true;
				break;
			}
		}

		if(typeof(this.lastAtlasInfo) != 'undefined'){
			var scaleX = this.lastAtlasInfo.scaleX * this.img.width;
			var scaleY = this.lastAtlasInfo.scaleY * this.img.height;

			var offsetX = this.lastAtlasInfo.offsetX * this.img.width;
			var offsetY = (1 - this.lastAtlasInfo.offsetY) * this.img.height - scaleY;

			this.imgWidth = scaleX * DRAW_SCALE;
			this.imgHeight = scaleY * DRAW_SCALE;

			if(this.calcCanvasPos()){
				Object.drawImage(this.img, 
					{
						offsetX: offsetX,
						offsetY: offsetY,
						cropWidth: scaleX, 
						cropHeight: scaleY, 
						posX: this.calcX,
						posY: this.calcY, 
						width: this.imgWidth, 
						height: this.imgHeight
					});
			}
		}

		return success;
	}

	return false;
}

Object.prototype.draw = function (){
	this.drawSprite(this.spriteName);
}

Object.prototype.update = function(){}