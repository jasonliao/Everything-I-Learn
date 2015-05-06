$('#signin').click(function () {
	$('#loginLayer').css('display','block');
	$("#login").animate({
		top:'850px'
		}, 600, 'easeOutBack', function () {
			$('#username').focus();
		});
});

$('#closeLogin').click(function () {
	$("#login").animate({
		top:'200px'
		}, 700, 'easeInBack', function () {
			$('#loginLayer').css('display','none');
		});
});