var particles = [];
var attractor;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  console.log(canvas);
  console.log("loggint");
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  for(var i = 0; i < 1000; ++i) {
    particles.push(new Particle(random(width), random(height), random(2)));
  }
  attractor = new Attractor(0, height/2);
}


function draw() {
  background(256, 256, 256);
  for(var i = 0; i < particles.length; ++i) {
    var attraction = attractor.calculateAttraction(particles[i]);

    particles[i].applyForce(attraction);

    //particle.edges();
    particles[i].update();
    particles[i].display();
  }
  attractor.display();
}
