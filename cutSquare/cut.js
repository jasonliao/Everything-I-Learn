/*
	裁剪图片的裁剪框
	导入该js 
	把div的id设置为L_cutSquare
	在css添加 
	#L_cutSquare {
		position: absolute;
		display: none;
		width: 120px;
		height: 120px;
		border: 1px black solid;
	}
*/

var L_cutSquare = function(parent) {
	this.me = this.$('L_cutSquare');
	this.parent = parent || window;
};

L_cutSquare.prototype = {
    
    style : function() {
        //背景的样式 
        var cutSquare_bg = this.ce('cutSquare_bg');
        cutSquare_bg.style.background = "white";
        cutSquare_bg.style.opacity = 0.3;
        cutSquare_bg.style.width = "100%";
        cutSquare_bg.style.height = "100%";
        cutSquare_bg.style.cursor = "move";
        //左上角拖动
        var cutSquare_lt = this.ce('cutSquare_lt');
        this.dragCornerStyle(cutSquare_lt);
        cutSquare_lt.style.left = "-3px";
        cutSquare_lt.style.top = "-3px";
        cutSquare_lt.style.cursor = "nw-resize";
        //左下角拖动
        var cutSquare_lb = this.ce('cutSquare_lb');
        this.dragCornerStyle(cutSquare_lb);
        cutSquare_lb.style.left = "-3px";
        cutSquare_lb.style.bottom = "-3px";
        cutSquare_lb.style.cursor = "sw-resize";
        //右上角拖动
        var cutSquare_rt = this.ce('cutSquare_rt');
        this.dragCornerStyle(cutSquare_rt);
        cutSquare_rt.style.right = "-3px";
        cutSquare_rt.style.top = "-3px";
        cutSquare_rt.style.cursor = "ne-resize";
        //右下角拖动
        var cutSquare_rb = this.ce('cutSquare_rb');
        this.dragCornerStyle(cutSquare_rb);
        cutSquare_rb.style.right = "-3px";
        cutSquare_rb.style.bottom = "-3px";
        cutSquare_rb.style.cursor = "se-resize";
        //上中拖动
        var cutSquare_tc = this.ce('cutSquare_tc');
        this.dragCornerStyle(cutSquare_tc);
        cutSquare_tc.style.top = "-3px";
        cutSquare_tc.style.left = "50%";
        cutSquare_tc.style.marginLeft = "-3px";
        cutSquare_tc.style.cursor = "n-resize";
        //下中拖动
        var cutSquare_bc = this.ce('cutSquare_bc');
        this.dragCornerStyle(cutSquare_bc);
        cutSquare_bc.style.bottom = "-3px";
        cutSquare_bc.style.left = "50%";
        cutSquare_bc.style.marginLeft = "-3px";
        cutSquare_bc.style.cursor = "s-resize";
        //右中拖动
        var cutSquare_rc = this.ce('cutSquare_rc');
        this.dragCornerStyle(cutSquare_rc);
        cutSquare_rc.style.right = "-3px";
        cutSquare_rc.style.top = "50%";
        cutSquare_rc.style.marginTop = "-3px";
        cutSquare_rc.style.cursor = "e-resize";
        //左中拖动
        var cutSquare_lc = this.ce('cutSquare_lc');
        this.dragCornerStyle(cutSquare_lc);
        cutSquare_lc.style.left = "-3px";
        cutSquare_lc.style.top = "50%";
        cutSquare_lc.style.marginTop = "-3px";
        cutSquare_lc.style.cursor = "w-resize";
        this.me.appendChild(cutSquare_bg);
        this.me.appendChild(cutSquare_lt);
        this.me.appendChild(cutSquare_lb);
        this.me.appendChild(cutSquare_rt);
        this.me.appendChild(cutSquare_rb);
        this.me.appendChild(cutSquare_tc);
        this.me.appendChild(cutSquare_bc);
        this.me.appendChild(cutSquare_rc);
        this.me.appendChild(cutSquare_lc);
    },
    $ : function(id) {
        return document.getElementById(id);
    },
    ce : function(id) {
        var div = document.createElement('div');
        div.id = id;
        return div;
    },
    dragCornerStyle : function(ele) {
        ele.style.overflow = "hidden";
        ele.style.position = "absolute";
        ele.style.width = "4px";
        ele.style.height = "4px";
        ele.style.border = "1px solid #000";
        ele.style.background = "white";
    },
    move : function() {
        var me = this.me;
        this.$('cutSquare_bg').onmousedown = function() {
            var e = window.event;
            var _this = this;
            var diffX = e.clientX - me.offsetLeft;
            var diffY = e.clientY - me.offsetTop;

            this.onmousemove = function (e) {
                me.style.left = e.clientX - diffX + 'px';
                me.style.top = e.clientY - diffY + 'px';
            };
            this.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;

            };
        };
    },
    nw_resize : function() {
        var me = this.me;
        this.$('cutSquare_lt').onmousedown = function() {
            var e = window.event;
            var oldX = e.clientX;
            var oldY = e.clientY;
            var meOldWidth = parseInt(window.getComputedStyle(me,null).width);
            var meOldHeight = parseInt(window.getComputedStyle(me,null).height);
            document.onmousemove = function(e) {
                var diffX = e.clientX - oldX;
                var diffY = e.clientY - oldY;
                //保持向左上角扩大
                me.style.left = e.clientX + "px";	
                me.style.top = e.clientY + "px";

                me.style.width = meOldWidth - diffX + "px";
                me.style.height = meOldHeight - diffY + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    ne_resize : function() {
        var me = this.me;
        this.$('cutSquare_rt').onmousedown = function() {
            var e = window.event;
            var oldX = e.clientX;
            var oldY = e.clientY;
            var meOldWidth = parseInt(window.getComputedStyle(me,null).width);
            var meOldHeight = parseInt(window.getComputedStyle(me,null).height);
            document.onmousemove = function(e) {
                var diffX = e.clientX - oldX;
                var diffY = e.clientY - oldY;
                //保持向右上角扩大	
                me.style.top = e.clientY + "px";

                me.style.width = meOldWidth + diffX + "px";
                me.style.height = meOldHeight - diffY + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    sw_resize : function() {
        var me = this.me;
        this.$('cutSquare_lb').onmousedown = function() {
            var e = window.event;
            var oldX = e.clientX;
            var oldY = e.clientY;
            var meOldWidth = parseInt(window.getComputedStyle(me,null).width);
            var meOldHeight = parseInt(window.getComputedStyle(me,null).height);
            document.onmousemove = function(e) {
                var diffX = e.clientX - oldX;
                var diffY = e.clientY - oldY;
                //保持向左下角扩大	
                me.style.left = e.clientX + "px";

                me.style.width = meOldWidth - diffX + "px";
                me.style.height = meOldHeight + diffY + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    se_resize : function() {
        var me = this.me;
        this.$('cutSquare_rb').onmousedown = function() {
            var e = window.event;
            var oldX = e.clientX;
            var oldY = e.clientY;
            var meOldWidth = parseInt(window.getComputedStyle(me,null).width);
            var meOldHeight = parseInt(window.getComputedStyle(me,null).height);
            document.onmousemove = function(e) {
                var diffX = e.clientX - oldX;
                var diffY = e.clientY - oldY;

                me.style.width = meOldWidth + diffX + "px";
                me.style.height = meOldHeight + diffY + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    tc_resize : function() {
        var me = this.me;
        this.$('cutSquare_tc').onmousedown = function() {
            var e = window.event;
            var oldY = e.clientY;
            var meOldHeight = parseInt(window.getComputedStyle(me,null).height);
            document.onmousemove = function(e) {
                var diffY = e.clientY - oldY;

                //保持向上调整
                me.style.top = e.clientY + "px";

                me.style.height = meOldHeight - diffY + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    bc_resize : function() {
        var me = this.me;
        this.$('cutSquare_bc').onmousedown = function() {
            var e = window.event;
            var oldY = e.clientY;
            var meOldHeight = parseInt(window.getComputedStyle(me,null).height);
            document.onmousemove = function(e) {
                var diffY = e.clientY - oldY;

                me.style.height = meOldHeight + diffY + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    lc_resize : function() {
        var me = this.me;
        this.$('cutSquare_lc').onmousedown = function() {
            var e = window.event;
            var oldX = e.clientX;
            var meOldWidth = parseInt(window.getComputedStyle(me,null).width);
            document.onmousemove = function(e) {
                var diffX = e.clientX - oldX;
                //保持向左调整
                me.style.left = e.clientX + "px";

                me.style.width = meOldWidth - diffX + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    rc_resize : function() {
        var me = this.me;
        this.$('cutSquare_rc').onmousedown = function() {
            var e = window.event;
            var oldX = e.clientX;
            var meOldWidth = parseInt(window.getComputedStyle(me,null).width);
            document.onmousemove = function(e) {
                var diffX = e.clientX - oldX;

                me.style.width = meOldWidth + diffX + "px";
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            };
        };
    },
    resize : function() {
        this.nw_resize();
        this.ne_resize();
        this.sw_resize();
        this.se_resize();
        this.tc_resize();
        this.bc_resize();
        this.lc_resize();
        this.rc_resize();
    },
    show : function(element) {
        this.me.style.display = "block";
        this.style();
        this.move();
        this.resize();

        if(this.parent.offsetLeft) {
            this.me.style.left = this.parent.offsetLeft + 'px';
            this.me.style.top = this.parent.offsetTop + 'px';
        }
    },
    destory : function() {
        this.me.style.display = "none";
        this.me.style.width = "120px";
        this.me.style.height = "120px";
        for(var i = 0; i < 9; i++) {
            $('L_cutSquare').removeChild($('L_cutSquare').childNodes[0]);
        }
        // this = null;
    };
}