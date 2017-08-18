function Drawable(canvas, pathOrText, isText){
	
	this.pos = {x : 0, y : 0};

	this.canvas = canvas;
	this.parent = null;

	if(isText == null || !isText)
	{
		this.setImage(pathOrText);
	}
	else
	{
		this.setText(pathOrText);
	}

	if(canvas.drawables == null)
	{
		canvas.drawables = [];
	}
	this.drawIndex = canvas.drawables.length;
	canvas.drawables.push(this);
}

Drawable.prototype.removeAllChildren = function(){
	var removeCount = 0;

	for(var i = 0 ; i < this.canvas.drawables.length ; ++i)
	{
		if(this.canvas.drawables[i].parent && this.canvas.drawables[i].parent == this)
		{
			this.canvas.drawables[i] = null;
			++removeCount;
		}
	}

	for(var i = 0 ; i < this.canvas.drawables.length ; ++i)
	{
		if(this.canvas.drawables[i] == null && this.canvas.drawables.length > i + 1)
		{
			this.canvas.drawables[i] = this.canvas.drawables[i+1];
			this.canvas.drawables[i+1] = null;
		}
	}

	this.canvas.drawables = this.canvas.drawables.slice(0, this.canvas.drawables.length - removeCount);
}

Drawable.prototype.setImage = function(imagePath){
	if(imagePath && imagePath.length > 0)
	{
		if(this.img == null || !this.img.src.includes(imagePath))
		{
			this.img = new Image();
			this.img.src = imagePath;
		}
	}
}

Drawable.prototype.setText = function(text){
	if(text && typeof(text) == 'string' && text.length > 0)
	{
		this.txt = {};
		this.txt.text = text;
		this.txt.fontSize = 60;
		this.txt.font = this.txt.fontSize + 'px DungGeunMo';
		this.txt.alpha = 1.0;
	    this.txt.textAlign = "left";
	    this.txt.textBaseline = "top";
	    this.txt.fadeOutInterval = 0;

		var ctx = this.canvas.getContext('2d');

		var savedFont = ctx.font;
		var savedFillStyle = ctx.fillStyle;
		var savedTextAlign = ctx.textAlign;
		var savedVerticalAlign = ctx.textBaseline;

	    ctx.font = this.txt.font;
		ctx.fillStyle = "rgba(255, 255, 255, " + this.txt.alpha + ")";
		ctx.textAlign = this.txt.textAlign;
		ctx.textBaseline = this.txt.textBaseline;

		var size = ctx.measureText(this.txt.text);
		this.setSize(size.width, this.txt.fontSize);

		ctx.font = savedFont;
		ctx.fillStyle = savedFillStyle;
		ctx.textAlign = savedTextAlign;
		ctx.textBaseline = savedVerticalAlign;
	}
}

Drawable.prototype.setTextFadeOut = function(startTime){
	if(this.txt)
	{
		this.txt.fadeOutStartTime = startTime;
	}
}

Drawable.prototype.setSize = function(width, height){
	this.size = {};
	this.size.width = width;
	this.size.height = height;
}

Drawable.prototype.setScale = function(scale){
	this.scale = scale;
}

Drawable.prototype.setPartialDrawSecond = function(time){
	this.partialTime = time;
	this.totalPartialTime = time;

	this.partialUpDown = false;
}

Drawable.prototype.setPartialDrawDirectReverse = function(set){
	this.partialUpDown = set;
}

Drawable.prototype.setWaitDrawSecond = function(time, callback){
	this.waitDrawTime = time;
	this.waitDrawTimeCB = callback;
}

Drawable.prototype.setWaitRemoveSecond = function(time, callback){
	this.waitRemoveSecond = time;
	this.waitRemoveSecondCB= callback;
}

Drawable.prototype.setPosition = function(x, y){
	this.pos = {x : x, y : y};
}

Drawable.prototype.draw = function(){
	if(!this.img && !this.txt)
	{
		return;
	}

	var flowSecond = 30 / 1000;

	if(this.txt && this.txt.fadeOutStartTime)
	{
		if(this.txt.fadeOutStartTime > 0)
		{
			this.txt.fadeOutStartTime -= flowSecond;
		}
		else
		{
			this.txt.fadeOutInterval = 0.05;
		}
	}

	if(this.waitDrawTime && this.waitDrawTime > 0)
	{
		this.waitDrawTime -= flowSecond;
		return;
	}
	else
	{
		if(this.waitDrawTimeCB && typeof(this.waitDrawTimeCB) == 'function')
		{
			this.waitDrawTimeCB();
			this.waitDrawTime = null;
			this.waitDrawTimeCB = null;
		}
	}

	if(this.waitRemoveSecond)
	{
		if(this.waitRemoveSecond > 0)
		{
			this.waitRemoveSecond -= flowSecond;
		}
		else
		{
			this.canvas.drawables.splice(this.drawIndex, 1);

			for(var i = this.drawIndex ; i < this.canvas.drawables.length ; ++i)
			{
				this.canvas.drawables[i].drawIndex -= 1;
			}

			if(this.waitRemoveSecondCB && typeof(this.waitRemoveSecondCB) == 'function')
			{
				this.waitRemoveSecondCB();
				this.waitRemoveSecond = null;
				this.waitRemoveSecondCB = null;
			}

			return;
		}
	}

	var ctx = this.canvas.getContext('2d');
	var scale = this.scale || 1;

	var curPos = {x:this.pos.x, y:this.pos.y};
	if(this.parent != null)
	{
		curPos.x += this.parent.pos.x;
		curPos.y += this.parent.pos.y;
	}

	var size = this.size;

	if(size == null)
	{
		if(this.img)
		{
	 		size = { width : this.img.width, height : this.img.height };
	 	}
	 	else
	 	{
	 		size = { width : 0, height : 0 };
	 	}
	}

	if(this.img)
	{
		if(!this.partialTime || this.partialTime <= 0)
		{
			ctx.drawImage(this.img, curPos.x, curPos.y, size.width * scale, size.height * scale);
		}
		else
		{
			var drawPercentage = (this.totalPartialTime - this.partialTime) / this.totalPartialTime;

			if(!this.partialUpDown)
			{
				var drawWidth = size.width * drawPercentage;
				var originWidth = this.img.width * drawPercentage;
				ctx.drawImage(this.img, 0, 0, originWidth, this.img.height, curPos.x, curPos.y, drawWidth * scale, size.height * scale);	
			}
			else
			{
				var drawHeight = size.height * drawPercentage;
				var originHeight = this.img.height * drawPercentage;
				ctx.drawImage(this.img, 0, 0, this.img.width, originHeight, curPos.x, curPos.y, size.width * scale, drawHeight * scale);	
			}

			this.partialTime -= flowSecond;
		}
	}
	else
	{
		this.txt.alpha -= this.txt.fadeOutInterval;

		var savedFont = ctx.font;
		var savedFillStyle = ctx.fillStyle;
		var savedTextAlign = ctx.textAlign;
		var savedVerticalAlign = ctx.textBaseline;

	    ctx.font = this.txt.font;
		ctx.fillStyle = "rgba(255, 255, 255, " + this.txt.alpha + ")";
		ctx.textAlign = this.txt.textAlign;
		ctx.textBaseline = this.txt.textBaseline;

		ctx.fillText(this.txt.text, curPos.x, curPos.y);

		ctx.font = savedFont;
		ctx.fillStyle = savedFillStyle;
		ctx.textAlign = savedTextAlign;
		ctx.textBaseline = savedVerticalAlign;
	}
}

Drawable.prototype.getSize = function(){
	var scale = this.scale || 1;

	if(this.size)
	{
		return { width : this.size.width * scale, height : this.size.height * scale };
	}

	if(this.img)
	{
		return { width : this.img.width * scale, height : this.img.height * scale };
	}
}

Drawable.prototype.setParent = function(parent){
	this.parent = parent;
}

Drawable.prototype.hasTouchEvent = function(){
	return this.touchEvent != null;
}

Drawable.prototype.setTouchEvent = function(event){
	this.touchEvent = event;
}

Drawable.prototype.runTouchEvent = function(){
	if(this.touchEvent)
	{
		this.touchEvent();
	}
}

Drawable.prototype.isTouched = function(pos){
	var size = this.getSize();

	var curPos = {x:this.pos.x, y:this.pos.y};
	if(this.parent != null)
	{
		curPos.x += this.parent.pos.x;
		curPos.y += this.parent.pos.y;
	}
	return ((curPos.x <= pos.x && size.width + curPos.x >= pos.x) &&
		(curPos.y <= pos.y && size.height + curPos.y >= pos.y));
}