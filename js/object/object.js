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

    this.offset = { x : 0, y : 0}
}

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

		this.calcX = this.drawPos.x * this.imgWidth + WIDTH_MARGIN;
		this.calcY = this.drawPos.y * this.imgHeight + HEIGHT_MARGIN;

		return true;
	}

	return false;
}

Object.drawImage = function(img, offsetX, offsetY, cropWidth, cropHeight, posX, posY, width, height)
{
	// turn off image anti aliasing
	ctx.msImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, posX, posY, width, height);
}

Object.prototype.setDrawOffset = function(offsetx, offsety){
	this.offset = { x : offsetx, y : offsety}
}

Object.prototype.drawSprite = function(spriteName){
	if(!this.img)
	{
		return;
	}

	if(typeof(this.atlasData) == 'undefined')
	{
		this.imgWidth = this.img.width * DRAW_SCALE;
		this.imgHeight = this.img.height * DRAW_SCALE;

		if(this.calcCanvasPos())
		{
			Object.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.calcX - this.offset.x, this.calcY - this.offset.y, this.imgWidth, this.imgHeight);
		}
	}
	else
	{
		var success = false;

		for(var i in this.atlasData.infos)
		{
			if(this.atlasData.infos[i].imageName == spriteName)
			{
				this.lastAtlasInfo = this.atlasData.infos[i];
				success = true;
				break;
			}
		}

		if(typeof(this.lastAtlasInfo) != 'undefined')
		{
			var scaleX = this.lastAtlasInfo.scaleX * this.img.width;
			var scaleY = this.lastAtlasInfo.scaleY * this.img.height;

			var offsetX = this.lastAtlasInfo.offsetX * this.img.width;
			var offsetY = (1 - this.lastAtlasInfo.offsetY) * this.img.height - scaleY;

			this.imgWidth = scaleX * DRAW_SCALE;
			this.imgHeight = scaleY * DRAW_SCALE;

			if(this.calcCanvasPos())
			{
				Object.drawImage(this.img, offsetX, offsetY, scaleX, scaleY, this.calcX - this.offset.x, this.calcY - this.offset.y, this.imgWidth, this.imgHeight);
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