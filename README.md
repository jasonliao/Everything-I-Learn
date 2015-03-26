#I'm sharing my code blocks here!

##1. sector_menu

 *  HTML
 *  CSS
 *  JQuery

&emsp;&emsp;But the code below in my js can't work, so I can't select part of my submenu items.


	submenuItems.each(function() {
		thisSubmenuItem = $(this);
		
		thisSubmenuItem.hover(function() {
			menuItems.eq(submenuId).parent().find('.submenu').addClass('active');
		});
	});
	
##2. Loading

* HTML
* CSS3

&emsp;&emsp;I hope you'll like it.

##3. cutSquare

原生js 封装了一个L_cutSquare对象 在html里加入
	<div id="L_cutSquare"></div>
并在你的js里new L_cutSquare() 参数是图片的htmlDOMobject
还要在你的css里面加入

    #L_cutSquare {
		position: absolute;
		display: none;
		width: 120px;
		height: 120px;
		border: 1px black solid;
	}


