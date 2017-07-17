var DRAW_SCALE = 2;

function getJson(url, callback) {
    var request = new XMLHttpRequest();
   	request.open("GET", url, true);
   	request.send(null)
   	request.addEventListener("readystatechange", function() {
 		if (request.readyState === 4 && request.status === 200) {
 			callback(JSON.parse(request.responseText));
  		}
	}, false);
}

function Object(){
	this.img = null;

    this.drawPos = { x : 0, y : 0 }
}

Object.prototype.initAtlasData = function(atlasName){
	var closureThis = this;
	getJson(atlasName, function(atlasdata){
		closureThis.atlasData = atlasdata;
	});
}

Object.prototype.drawSprite = function(spriteName){
	if(typeof(this.atlasData) == 'undefined')
	{
		this.imgWidth = this.img.width * DRAW_SCALE;
		this.imgHeight = this.img.height * DRAW_SCALE;

		this.calcX = this.drawPos.x * this.imgWidth;
		this.calcY = this.drawPos.y * this.imgHeight;

		ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.calcX, this.calcY, this.img.width * DRAW_SCALE, this.img.height * DRAW_SCALE);
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

			this.calcX = this.drawPos.x * this.imgWidth;
			this.calcY = this.drawPos.y * this.imgHeight;

			ctx.drawImage(this.img, offsetX, offsetY, scaleX, scaleY, this.calcX, this.calcY, this.imgWidth, this.imgHeight);
		}

		return success;
	}

	return false;
}

Object.prototype.draw = function (){
	this.drawSprite(this.spriteName);
}

Object.prototype.update = function(){}