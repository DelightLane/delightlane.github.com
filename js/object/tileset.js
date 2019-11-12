
function Tileset(tilesetInfos, idx, loadCompleteCB){
	var getTilesetName = function(idx){
		if(tilesetInfos.length <= idx)
			return null;

		var path = tilesetInfos[idx].source;

		var name = null;
		var splitedPath = path.split("\/");
	    for(var i = 0 ; i < splitedPath.length ; ++i){
	        if(splitedPath[i].includes(".json")){
	            name = splitedPath[i];
	            break;
	        }
	    }

	    return name;
	}
	///////////////////////////////

	var tileName = getTilesetName(idx);
	this.firstGid = tilesetInfos[idx].firstgid;

    var thisRef = this;
    getJson(SITE_URL + "resource/tileset/" + tileName, function(tileset){

    	thisRef.cropWidth = tileset.tilewidth;
    	thisRef.cropHeight = tileset.tileheight;

    	thisRef.width = tileset.tilewidth * DRAW_SCALE;
    	thisRef.height = tileset.tileheight * DRAW_SCALE;

    	thisRef.cols = tileset.imagewidth / tileset.tilewidth;

    	var imgSplited = tileset.image.split('\/');
    	for(var i = 0 ; i < imgSplited.length; ++i){
    		if(imgSplited[i].includes(".png")){
    			thisRef.imgPath = "/resource/tileset/" + imgSplited[i];
			    
    			console.log(imgSplited[i] + " 타일셋 로드 완료");
    			break;
    		}
    	}

    	loadCompleteCB();
    });
}

Tileset.prototype.getDrawInfo = function(x, y, gid){ 

	// gid는 1부터 시작

	return {
		offsetX: (gid > 0 ? parseInt(gid % this.cols) - 1 : 1) * this.cropWidth,
		offsetY: (gid > 0 ? parseInt(gid / this.cols) : 0) * this.cropHeight,
		cropWidth: this.cropWidth, 
		cropHeight: this.cropHeight, 
		posX: x,
		posY: y, 
		width: this.width, 
		height: this.height
	}
}

Tileset.prototype.getMapPos = function(screenX, screenY){

	return {
		x: parseInt(screenX / this.cropWidth),
		y: parseInt(screenY / this.cropHeight)
	}
}