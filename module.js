var GLOBAL = {};
GLOBAL.particle = (function() {
	var x = "blah";
	function privateFunction() {
		console.log("you can't access this from outside");
	}
	return { //particle is an object of GLOBAL and contains 2 functions, print and printx
		print: function print() {
			console.log("hello");
		},
		printx: function printx() {
			console.log(x);
		}
	};
}());

GLOBAL.particle.print();
GLOBAL.particle.printx();

(function() {
	GLOBAL.goodbye = function() {
		console.log("goodbye");
	}
}());

GLOBAL.goodbye();
