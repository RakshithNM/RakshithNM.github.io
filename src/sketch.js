var canvas;
var particle;
var numberOfParticles = 200;
var particles = new Array(numberOfParticles);

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  colorMode(HSB);
  for(var i = 0; i < numberOfParticles; ++i) {
    particles[i] = new Particle(createVector(random(width), random(height)), 75, 100);
  }
  stroke(255);
}


function draw() {
  background(244)
  for(var i = 0; i < particles.length; ++i) {
    particles[i].update(particles, i);
  }
}
