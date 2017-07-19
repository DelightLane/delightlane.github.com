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

	canvas.width = width * scale;
	canvas.height = height * scale;

	ctx.scale(scale, scale);
}

function setDecription(text)
{
	var textElem = document.getElementById('descText');
    textElem.innerHTML = text;
}

if(isMobile())
{
	setDecription("tip : 터치로 이동해 주세요.");
}
else
{
	setDecription("tip : 방향키 혹은 마우스 클릭으로 이동해 주세요.");	
}

function include(jsname) {
	document.write("<script src='" + jsname + "'></script>");
}

include(SITE_URL + "js/object/object.js");
include(SITE_URL + "js/object/player.js");
include(SITE_URL + "js/object/placeObject.js");
include(SITE_URL + "js/object/tile.js");
include(SITE_URL + "js/object/triggerObject.js");

include(SITE_URL + "js/map.js");