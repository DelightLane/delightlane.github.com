var canvas = document.getElementById("gameScene");

var ctx = canvas.getContext( '2d' );

window.addEventListener('resize', initScreenInfo, false);
window.addEventListener('orientationchange', initScreenInfo, false);
initScreenInfo();

var COLS;
var ROWS;

function initGlobal(mapData){
	if(mapData != null){
		COLS = mapData.cols;
		ROWS = mapData.rows;
	}
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



if(isMobile()){
	setDescription("tip : 터치로 이동해 주세요.");
}
else{
	setDescription("tip : 방향키 혹은 마우스 클릭으로 이동해 주세요.");	
}

function getMouseTouchPos(canvasDom, e) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}


var descriptMark = false;
// 디스크립션 관련
function setDescription(text){
	var border = $("#descBorder");

	if(text.length <= 0)
	{
		border.hide();
		descriptMark = false;
	}
	else
	{
		border.show();
		descriptMark = true;
	}

	var textElem = document.getElementById('descText');
    textElem.innerHTML = text;
    $("#descLoading").hide();
}

var loadHtml = null;
function setDescriptionHtml(fileName)
{
	var border = $("#descBorder");

	if(fileName != null && fileName.length > 0){
		$("#descLoading").show();

		descriptMark = true;

		loadHtml = $.ajax({
            url: '/descHtml/' + fileName + '.html',
            success: function(data) {
              border.show();
              $("#descLoading").hide();
              $("#descHtml").html(data);
            }
          });
	}
	else{
		if(loadHtml != null){
			loadHtml.abort();
			loadHtml = null;
		}

		descriptMark = false;

		border.hide();

		$("#descLoading").hide();
		$("#descHtml").empty();
	}
}



// 쿠키 관련
function removeCookie(name){
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
function setUpdateFunc(func){
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

var imagePreload = function() {
    var image_cache_array = new Array();
    var i = 0;

    if (!document.images) {
      return false;
    }

    for (key in arguments) {
      	image_cache_array[i] = new Image();
      	image_cache_array[i].src = arguments[key];
      	i++;
    }

    var allPage = $('allPage');
	allPage.css('display', 'none');
	$('loading').show();

    image_cache_array[i - 1].onload = function(){
    	$('loading').fadeOut('', function(){
			allPage.fadeIn();
		});
    }

    return i;
}

var prevNotifiedMapNameTxt;

function notifyMapName(mapName){
	setUpdateFunc(function(){
		if(isInit)
		{
			var txt = new Drawable(canvas, mapName, true);
			txt.setPosition(canvas.width - txt.getSize().width - 20, canvas.height - txt.getSize().height - 20);
			txt.setTextFadeOut(1);
			txt.setWaitRemoveSecond(5);

			prevNotifiedMapNameTxt = txt;

			setUpdateFunc(null);
		}
	});
}



function include(jsname) {
	document.write("<script src='" + SITE_URL + jsname + "'></script>");
}



/****************************************************/
/********* 게임 주요 루프 로직 include를 통한 실행 **********/
/****************************************************/
include("js/object/object.js");
include("js/object/player.js");
include("js/object/placeObject.js");
include("js/object/tile.js");
include("js/object/triggerObject.js");
include("js/object/drawable.js");

include("js/map.js");

include("js/controller.js");
include("js/draw.js");
include("js/update.js");