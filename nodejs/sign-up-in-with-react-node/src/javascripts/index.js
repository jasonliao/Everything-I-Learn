$('#signin').click(function () {
	$('#loginLayer').css('display','block');
	$("#login").animate({
		top:'850px'
		}, 600, 'easeOutBack', function () {
			$('#loginUsername').focus();
		});
});

$('#signup').click(function () {
	$('#loginLayer').css('display','block');
	$("#register").animate({
		top:'850px'
		}, 600, 'easeOutBack', function () {
			$('#signUpUsername').focus();
		});
});

$('#closeLogin').click(function () {
	$("#login").animate({
		top:'200px'
		}, 700, 'easeInBack', function () {
			$('#loginLayer').css('display','none');
		});
});

$('#closeSignUp').click(function () {
	$("#register").animate({
		top:'200px'
		}, 700, 'easeInBack', function () {
			$('#loginLayer').css('display','none');
		});
});