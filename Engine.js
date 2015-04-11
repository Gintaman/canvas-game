var ParticleModule = (function() {
	var pub = {};
	var x, y;
	///default velocities and gravity
	var vx,
		vy,
		gravity = 0.3;
	var particles = {},
		particleIndex = 0,
	    particleNum = 5; //default value
	var width, height;
	var c;
	var type;
	pub.initialize = function(options, cx) {
		x = options.x, y = options.y;
		type = options.type;
		if(options.particleNum)
			particleNum = options.particleNum;
		width = options.width,
		height = options.height;
		c = cx;
	};
	var particles = {},
		particleIndex = 0,
		particleNum = 5;
	function Particle() {
		this.x = x;
		this.y = y;
		this.vx = Math.random() * 10 - 5;
		this.vy = Math.random() * 10 - 5;
		this.gravity = gravity;
		particleIndex++;
		particles[particleIndex] = this;
		this.id = particleIndex;
		this.life = 0;
		this.maxLife = Math.random() * 30 + 10;
		this.color = "rgb("+parseInt(Math.random()*255,10)+",0,0)";
	}
	
	Particle.prototype.draw = function() {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += gravity;
		/*if(this.y > 300) {
			this.vy *= -0.5;
			this.vx *= 0.5;
			this.y = 300;
		}*/
		this.life++;
		if(this.life >= this.maxLife) {
			delete particles[this.id];
		}
		cx.fillStyle = "white";
		cx.fillRect(this.x, this.y, 5, 5);
	};

	var frames = 0;

	var interval = setInterval(function() {
		cx.fillStyle = "rgba(0, 0, 0, 0.2)";
		cx.fillRect(0, 0, width, height);
		if(frames < 10) {
		for(var i = 0; i < particleNum; i++) 
			new Particle();
		}
		for(var i in particles)
			particles[i].draw();
		frames++;
	}, 30);
	return pub;

	if(frames >= 30)
		clearInterval(interval);
	
}());

//initialize will take following arguments
//x, y, type
