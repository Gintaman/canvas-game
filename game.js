function init($, _) {
	requestAnimationFrame = _.requestAnimationFrame || _.webkitRequestAnimationFrame || _.msRequestAnimationFrame || _.mozRequestAnimationFrame;
	
	var canvas = $.querySelector("#canvas");
	var cx = canvas.getContext("2d");
	var canvas2 = $.querySelector("#canvas2");
	var cx2 = canvas2.getContext("2d");
	var canvas3 = $.querySelector("#canvas3");
	var cx3 = canvas3.getContext("2d");
	var canvas4 = $.querySelector("#canvas4");
	var cx4 = canvas4.getContext("2d");
	
	var then = Date.now();
	var keysDown = {};
	var vx = 0.3,
		vx2 = 0.2,
	    vx3 = 0.1,
	    vx4 = 0.05,
		xpos,
		xpos1,
		xpos2,
		xpos3;

	var x = canvas.width / 6,
		y = canvas.height / 2,
		xoffset = 64,
		yoffset = 14;

	var ms = 300; //movespeed
	
	canvas.style.zIndex = "500";
	canvas2.style.zIndex = "499";
	canvas3.style.zIndex = "498";
	canvas4.style.zIndex = "497";
	canvas.style.position = "absolute";
	canvas2.style.position = "absolute";
	canvas3.style.position = "absolute";

	var img = $.createElement("img");
	var spriteh = 14, //default, side view
		spritew = 64,
		starty = 70; //y position where sprite begins

	//change to check if all images are loaded. google
	canvas.addEventListener("click", function() {
		main();
	});

	var totalseconds = 0;
	var imgReady, bgReady;

	img.src = "img/spritesheet.png";
	img.addEventListener("load", function() {
		imgReady = true;
	});

	var background = $.createElement("img");
	background.src = "img/background.png";
	var layer1 = $.createElement("img");
	layer1.src = "img/layer1.png";
	var layer2 = $.createElement("img");
	layer2.src = "img/layer2.png";
	var layer3 = $.createElement("img");
	layer3.src = "img/layer3new.png";
	var layer4 = $.createElement("img");
	layer4.src = "img/layer5.png";

	img.addEventListener("load", function() {
		bgReady = true;	
	});


	//fixes the stutter problem
	addEventListener("keydown", function(event) {
		if(event.keyCode === 38 || event.keyCode === 40) event.preventDefault();
		keysDown[event.keyCode] = true;
	}, false);

	addEventListener("keyup", function(event) {
		starty = 70, spriteh = 14;
		delete keysDown[event.keyCode];
	}, false);

	function update(modifier) {
		if(38 in keysDown) { //up arrowkey
			starty = 0, spriteh = 35;
			y -= ms * modifier;
		} 
		if(40 in keysDown)  {
			starty = 35, spriteh = 35;
			y += ms * modifier;
		}
		if(37 in keysDown) {
			x -= ms * modifier;
		} 
		if(39 in keysDown) {
			x += ms * modifier;
		} 

		if(x + xoffset >= canvas.width) x = canvas.width - xoffset;
		if(x <= 0) x = 0;
		if(y + yoffset >= canvas.height) y = canvas.height - yoffset;
		if(y <= 0) y = 0;
	}

	function draw(delta) {
		totalseconds += delta;
		xpos = totalseconds * vx % canvas.width;
		xpos2 = totalseconds * vx2 % canvas.width;
		xpos3 = totalseconds * vx3 % canvas.width;
		xpos4 = totalseconds * vx4 % canvas.width;

		cx.clearRect(0, 0, canvas.width, canvas.height);
		cx2.clearRect(0, 0, canvas.width, canvas.height);
		cx3.clearRect(0, 0, canvas.width, canvas.height);
		cx4.clearRect(0, 0, canvas.width, canvas.height);

		cx.save();
		cx2.save();
		cx3.save();
		cx4.save();
		cx4.translate(-xpos4, 0);
		cx4.drawImage(layer4, 0, 0);
		cx4.drawImage(layer4, canvas.width - 1, 0);

		cx.translate(-xpos, 0);
		cx.drawImage(layer1, 0, 0);
		cx.drawImage(layer1, canvas.width - 1, 0);
		
		cx2.translate(-xpos2, 0);
		cx2.drawImage(layer2, 0, 0);
		cx2.drawImage(layer2, canvas.width - 1, 0);

		cx3.translate(-xpos3, 0);
		cx3.drawImage(layer3, 0, 0);
		cx3.drawImage(layer3, canvas.width - 1, 0);


		cx.restore();
		cx2.restore();
		cx3.restore();
		cx4.restore();

		cx.drawImage(img, 0, starty, spritew, spriteh, x, y, 64, spriteh);
		//cx.drawImage(img, x, y);
	}

	function main() {
		var now = Date.now();
		var delta = now - then;

		update(delta/1000);
		draw(delta);
		then = now;
		requestAnimationFrame(main);
	}
}
