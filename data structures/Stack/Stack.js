var Stack = function () {
//	return [].slice.call(arguments);
};

Stack.prototype = {
	push : function (item) {
		this.push(item);
	},
	multiPush : function (arr) {
		arr.forEach(function (item) {
			this.push(item);
		});
	}
};

var stack = new Stack();
//stack.push(3);
stack.multiPush([2,5]);
console.log(stack);