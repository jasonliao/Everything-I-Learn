var thisButton,
	thisMenuItem,
	thisSubmenuItem,
	pieMenu = $('.radialnav'),
	menuItems = $('.menu > .item > a'),
	submenu = $('.submenu'),
	submenuItems = $('.submenu > .item > a'),
	submenuId = 0;

function openMenu(thisButton) {
	if(!thisButton.hasClass('active')) {
		thisButton.addClass('active');
	} else {
		$('.radialnav, .submenu').removeClass('active');
	}
}

$('.ellipsis').click(function(event) {
	event.preventDefault();
	openMenu($('.radialnav'));
});

menuItems.each(function(index) {
	thisMenuItem = $(this);

	thisMenuItem.hover(function() {
		submenuId = index;
		menuItems.eq(index).parent().find('.submenu').addClass('active');
	}, function() {
		$('.submenu').removeClass('active');
	});
});

submenuItems.each(function() {
	thisSubmenuItem = $(this);

	thisSubmenuItem.hover(function() {
		menuItems.eq(submenuId).parent().find('.submenu').addClass('active');
	}, function() {
		$('.submenu').removeClass('active');
	});
});



