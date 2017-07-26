var canvas = document.getElementById("gameScene");

var ctx = canvas.getContext( '2d' );

window.addEventListener('resize', initScreenInfo, false);
window.addEventListener('orientationchange', initScreenInfo, false);
initScreenInfo();

var COLS;
var ROWS;

var W;
var H;

var BLOCK_W;
var BLOCK_H;

function initGlobal(mapData)
{
	if(mapData != null)
	{
		COLS = mapData.cols;
		ROWS = mapData.rows;
	}

	W = window.innerWidth;
	H = window.innerHeight;

	BLOCK_W = W / COLS;
	BLOCK_H = H / ROWS;
}

function initScreenInfo() {
	initGlobal();
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



if(isMobile())
{
	setDescription("tip : 터치로 이동해 주세요.");
}
else
{
	setDescription("tip : 방향키 혹은 마우스 클릭으로 이동해 주세요.");	
}



// 디스크립션 관련
function setDescription(text)
{
	var textElem = document.getElementById('descText');
    textElem.innerHTML = text;
    $("#descLoading").hide();
}

function setDescriptionHtml(fileName)
{
	if(fileName != null && fileName.length > 0)
	{
		$("#descLoading").show();
		$("#descHtml").load('/descHtml/' + fileName + '.html', function() {
			$("#descLoading").hide();
			console.log("load "+ fileName);
		});
	}
	else
	{
		$("#descLoading").hide();
		$("#descHtml").empty();
	}
}



// 쿠키 관련
function removeCookie(name)
{
	var date = new Date();
	date.setTime(date.getTime() - 1);
	var path = "path=" + '/';
	document.cookie = name += "=; expires=" + date.toGMTString() + "; " + path;
}

 function removeCookies(){
 	if(document.cookie != ""){

 		var cookies = document.cookie.split("; ");

	    for(var i =0; i < cookies.length; i++){
	    	var cookieName = cookies[i].split("=")[0];
	    	removeCookie(cookieName);
	    }
	}
 }

function setCookie(name, value){
	var date = new Date();
	date.setDate(date.getDate() + 1);
	var expires = "expires=" + date.toGMTString();
	var path = "path=" + '/';
	document.cookie = name + "=" + value + "; " + expires + "; " + path;
}

function getCookie(name){
	name += "=";

	var cookie = document.cookie;

    var startIdx = cookie.indexOf(name);
    if (startIdx != -1) {

        startIdx += name.length;
        var endIdx = cookie.indexOf(";", startIdx);

        if (endIdx == -1) {

            endIdx = cookie.length;
            return unescape(cookie.substring(startIdx, endIdx));
        }
    }
    return null;
}



// 임시로 지정하는 업데이트 기능 관련
var settingUpdate = undefined;
function setUpdateFunc(func)
{
	if(settingUpdate)
	{
		clearInterval(settingUpdate);
		settingUpdate = undefined;
	}

	if(func)
	{
		settingUpdate = setInterval(func, 30);
	}
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

include(SITE_URL + "js/controller.js");
include(SITE_URL + "js/draw.js");
include(SITE_URL + "js/update.js");