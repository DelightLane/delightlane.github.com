function Drawable(canvas, imagePath){
	
	this.setImage(imagePath);

	this.pos = {x : 0, y : 0};

	this.canvas = canvas;
	this.parent = null;

	if(canvas.drawables == null)
	{
		canvas.drawables = [];
	}
	canvas.drawables.push(this);
}

Drawable.removeHasParentElem = function(canvas){
	var removeCount = 0;

	for(var i = 0 ; i < canvas.drawables.length ; ++i)
	{
		if(canvas.drawables[i].parent)
		{
			canvas.drawables[i] = null;
			++removeCount;
		}
	}

	for(var i = 0 ; i < canvas.drawables.length ; ++i)
	{
		if(canvas.drawables[i] == null && canvas.drawables.length > i + 1)
		{
			canvas.drawables[i] = canvas.drawables[i+1];
			canvas.drawables[i+1] = null;
		}
	}

	canvas.drawables = canvas.drawables.slice(0, canvas.drawables.length - removeCount);
}

Drawable.prototype.setImage = function(imagePath){
	if(this.img == null || !this.img.src.includes(imagePath))
	{
		this.img = new Image();
		this.img.src = imagePath;
	}
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

Drawable.prototype.setWaitDrawSecond = function(time){
	this.waitDrawTime = time;
}

Drawable.prototype.setPosition = function(x, y){
	this.pos = {x : x, y : y};
}

Drawable.prototype.draw = function(){
	var flowSceond = 30 / 1000;

	if(this.waitDrawTime && this.waitDrawTime > 0)
	{
		this.waitDrawTime -= flowSceond;
		return;
	}

	var ctx = this.canvas.getContext('2d');
	var scale = this.scale || 1;

	var curPos = {x:this.pos.x, y:this.pos.y};
	if(this.parent != null)
	{
		curPos.x += this.parent.pos.x;
		curPos.y += this.parent.pos.y;
	}

	if(!this.partialTime || this.partialTime <= 0)
	{
		ctx.drawImage(this.img, curPos.x, curPos.y, this.img.width * scale, this.img.height * scale);
	}
	else
	{
		var drawPercentage = (this.totalPartialTime - this.partialTime) / this.totalPartialTime;

		if(!this.partialUpDown)
		{
			var drawWidth = this.img.width * drawPercentage;
			ctx.drawImage(this.img, 0, 0, drawWidth, this.img.height, curPos.x, curPos.y, drawWidth * scale, this.img.height * scale);	
		}
		else
		{
			var drawHeight = this.img.height * drawPercentage;
			ctx.drawImage(this.img, 0, 0, this.img.width, drawHeight, curPos.x, curPos.y, this.img.width * scale, drawHeight * scale);	
		}

		this.partialTime -= flowSceond;
	}
}

Drawable.prototype.getSize = function(){
	var scale = this.scale || 1;
	return { width : this.img.width * scale, height : this.img.height * scale };
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