#I'm sharing my code blocks here!

##1. sector_menu

 *  HTML
 *  CSS
 *  JQuery

&emsp;&emsp;But the code below in my js can't work, so I can't select part of my submenu items


	submenuItems.each(function() {
		thisSubmenuItem = $(this);
		
		thisSubmenuItem.hover(function() {
			menuItems.eq(submenuId).parent().find('.submenu').addClass('active');
		});
	});
