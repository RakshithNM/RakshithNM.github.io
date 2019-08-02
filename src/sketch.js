var particles = [];
var attractor;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  for(var i = 0; i < 100; ++i) {
    particles.push(new Particle(random(width), random(height), random(2)));
  }
}


function draw() {
  attractor = new Attractor(mouseX, mouseY);
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
