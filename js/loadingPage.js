var allPage = $('allPage');
allPage.css('display', 'none');

$(window).load(function() {
	// 로딩 완료되었을때

	$('loading').fadeOut('', function(){
		allPage.fadeIn();
	});
}); 