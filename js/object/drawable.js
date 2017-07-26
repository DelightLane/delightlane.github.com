function Drawable(canvas, imagePath){
	this.img = new Image();
	this.img.src = imagePath;

	this.pos = {x : 0, y : 0};

	this.canvas = canvas;
	this.parent = null;

	if(canvas.drawables == null)
	{
		canvas.drawables = [];
	}
	canvas.drawables.push(this);
}

Drawable.prototype.setPosition = function(x, y){
	this.pos = {x : x, y : y};
}

Drawable.prototype.draw = function(){
	var ctx = this.canvas.getContext('2d');

	var curPos = {x:this.pos.x, y:this.pos.y};
	if(this.parent != null)
	{
		curPos.x += this.parent.pos.x;
		curPos.y += this.parent.pos.y;
	}
	ctx.drawImage(this.img, curPos.x, curPos.y);
}

Drawable.prototype.getSize = function(){
	return { width : this.img.width, height : this.img.height };
}

Drawable.prototype.setParent = function(parent){
	this.parent = parent;
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