var canvas = document.getElementById("gameScene");

var ctx = canvas.getContext( '2d' );

window.addEventListener('resize', initScreenInfo, false);
window.addEventListener('orientationchange', initScreenInfo, false);
initScreenInfo();

var COLS;
var ROWS;

function initGlobalSize(cols, rows){
	if(cols != null && rows != null){
		COLS = cols;
		ROWS = rows;
	}
}

function initScreenInfo() {
	if(window.innerWidth > 700)
		$('.site-header-bg').css("background-size", window.innerWidth + "px");
	
	initGlobalSize();
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


function initHeader(){
	var headWrap = $(".head_wrapper");
	var siteTitle = $(".site-title");
	var siteNav = $(".site-nav");

	var maxHeight = window.innerHeight;
	var titleMargin = (maxHeight * 0.3);

	headWrap.css('margin-top', "0px");
	headWrap.css('height', maxHeight + "px");

	siteTitle.css('margin-top', titleMargin + "px");

	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();

		if(scrollTop < maxHeight - 80){

			var topMargin = scrollTop;
			var height = maxHeight - scrollTop;

			var calcTitleMargin = titleMargin + scrollTop;
			var calcNavMargin = scrollTop;
			if(calcTitleMargin >  maxHeight - 120)
			{
				calcTitleMargin = maxHeight - 120;
			}

			if(calcNavMargin > maxHeight)
				calcNavMargin = maxHeight;

			siteTitle.css({
				"margin-top" : calcTitleMargin,
			})

			siteNav.css({
				"margin-top" : calcNavMargin,
			})
		}
		
		if(window.isInit || window.isNewInit)
		{
			setCookie("goToHeight", maxHeight - 100);
		}

		if(window.isInit || window.isNewInit)
		{
			if(scrollTop < 5)
			{
				removeCookie("goToHeight")
			}
		}
	});
}


function initDescription(){
	var desc = $("#gameDescription");

	desc.addClass('float_right')

	var headWrap = $(".head_wrapper");

	$(window).scroll(function() {

		var floatPosition = parseInt(headWrap.css('height')) + parseInt(headWrap.css('margin-top')) + 20;
		
		var scrollTop = $(window).scrollTop();
		if(scrollTop < floatPosition)
			scrollTop = floatPosition;

		var newPosition = scrollTop + "px";

		desc.stop().animate({
			"top" : newPosition
		}, 300);

	}).scroll();

}

var descriptMark = false;
// 디스크립션 관련
function setDescription(text){
	var border = $("#descBorder");
	var description = $("#gameDescription");

	if(text.length <= 0)
	{
		border.hide();
		description.css("display", "none");
		descriptMark = false;

		description.off("click");
	}
	else
	{
		description.css("display", "block");
		border.show();
		descriptMark = true;

		// 텍스트만 출력할 시에는 눌러서 끌 수 있게 셋팅
		description.on("click", function(){
			setDescription("");
	        setDescriptionHtml();
		});
	}

	var textElem = document.getElementById('descText');
    textElem.innerHTML = text;
    $("#descLoading").hide();
}

var loadHtml = null;
function setDescriptionHtml(fileName)
{
	var border = $("#descBorder");
	var description = $("#gameDescription");

	if(fileName != null && fileName.length > 0){
		description.css("display", "block");

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
		description.css("display", "none");

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

function setCookie(name, value, expireSec){
	//console.log("쿠키 set : "+name)
	var date = new Date();
	if (expireSec) {
		var date = new Date();
		date.setTime(date.getTime() + (expireSec * 1000));
	}
	else{
		date.setDate(date.getDate() + 1);
	}
	var expires = "expires=" + date.toGMTString();
	var path = "path=" + '/';
	document.cookie = name + "=" + value + "; " + expires + "; " + path;
}

function getCookie(name){
	//console.log("쿠키 get : "+name)
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
include("js/object/drawable.js");
include("js/object/tileset.js");

include("js/map.js");

include("js/controller.js");
include("js/draw.js");
include("js/update.js");

initHeader();
initDescription();


var goToHeight = getCookie("goToHeight");
if(goToHeight != null)
{
	var loadComp = setInterval(function()
	{
		if(window.isInit || window.isNewInit)
		{
			setTimeout(function() { 
				$('html, body').animate({
			        scrollTop:goToHeight
			      }, 800);
			
			}, 500);
			
			clearInterval(loadComp);
		}
	}, 30)
}