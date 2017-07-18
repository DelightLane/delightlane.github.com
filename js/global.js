var COLS = 21;
var ROWS = 3;

var TOWN_COUNT = 3;

var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];

var ctx = canvas.getContext( '2d' );
window.addEventListener('resize', initScreenInfo, false);
window.addEventListener('orientationchange', initScreenInfo, false);
initScreenInfo();

var W = window.innerWidth, H = window.innerHeight;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
var WIDTH_MARGIN;
var HEIGHT_MARGIN;
var CANVAS_W;
var CANVAS_H;

function initScreenInfo() {
	W = window.innerWidth;
	H = window.innerHeight;

	BLOCK_W = W / COLS;
	BLOCK_H = H / ROWS;
}

function isMobile(){
	var mobileKeyArr = new Array('iPhone', 'iPad', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
	for (var word in mobileKeyArr) { 
    	if (navigator.userAgent.match(mobileKeyArr [word]) != null) { 
        	return true;
    	} 
    }

    return false;
}

function initCanvas(width, height){
 	var scale = 1;

 	if(isMobile())
 	{
 		scale = window.innerWidth / width;
 	}

 	CANVAS_W = width * scale;
	CANVAS_H = height * scale;

	canvas.width = CANVAS_W;
	canvas.height = CANVAS_H;

	ctx.scale(scale, scale);
}

function include(jsname) {
	document.write("<script src='" + jsname + "'></script>");
}

include("js/object/object.js");
include("js/object/player.js");
include("js/object/placeObject.js");
include("js/object/tile.js");
include("js/object/town.js");

include("js/map.js");