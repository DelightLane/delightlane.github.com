function Drawable(canvas, imagePath){
	this.img = new Image();
	this.img.src = imagePath;

	this.pos = {x : 0, y : 0};

	this.parent = canvas;

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
	var ctx = this.parent.getContext('2d');
	ctx.drawImage(this.img, this.pos.x, this.pos.y);
}

Drawable.prototype.getSize = function(){
	return { width : this.img.width, height : this.img.height };
}