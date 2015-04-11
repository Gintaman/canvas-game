function init(cx, $, _) {
	$.body.style.padding = "0px";
	$.body.style.margin = "0px";
	$.body.style.textAlign = "center";

	var canvas = $.querySelector("#canvas");
	canvas.style.marginTop = _.innerHeight / 2 - 300 + "px";
	var particles = {},
		particleIndex = 0,
		particleNum = 5;

	function Particle() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.vx = Math.random() * 10 - 5;
		this.vy = Math.random() * 10 - 5;
		this.gravity = 0.3;
		particleIndex++;
		particles[particleIndex] = this;
		this.id = particleIndex;
		this.life = 0;
		this.maxLife = Math.random() * 30 + 10;
		this.color = "rgb(" + parseInt(Math.random()*255, 10)+",0,0)";
	}
	Particle.prototype.draw = function() {
		this.x += this.vx;
		this.y += this.vy;
		//this.vy += this.gravity;
		if(Math.random() < 0.1) { //gives cool teleporter effect
			this.vx = Math.random() * 10 - 5;
			//this.vy = Math.random() * 10 - 5;
		}
		this.life++;
		if(this.life >= this.maxLife) { //set a lifetime for the particle
			delete particles[this.id];
		}
		cx.fillStyle = this.color;
		cx.fillRect(this.x, this.y, 1, 1);
	};


	setInterval(function() {
		cx.fillStyle = "rgba(0, 0, 0, 0.2)";
		cx.fillRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < particleNum; i++) {
			new Particle();
		}
		for(var i in particles) {
			particles[i].draw();
		}
	}, 30);
}
