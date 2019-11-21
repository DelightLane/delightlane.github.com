$(function() {

	var bg = $('.site-header-bg');

	var curPos = bg.css('background-position-y');
	curPos = new Number(curPos.replace("%", ""));

	var prevValue = 0;

	$(window).scroll(function() {
		var value = $(this).scrollTop();
	
		curPos = curPos - (value - prevValue) * 0.2;
		bg.css('background-position-y', curPos+'%');

		prevValue = value;
	});
});