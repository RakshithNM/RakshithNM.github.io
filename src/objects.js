var Particle = function(inX, inY, inMass) {
  this.position = createVector(inX, inY);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mass = inMass;
}

Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  this.acceleration.set(0, 0);
}

Particle.prototype.display = function() {
  fill(244);
  ellipse(this.position.x, this.position.y, this.mass * 10, this.mass * 10);
}

Particle.prototype.applyForce = function(inForce) {
  const f = inForce.copy();
  f.div(this.mass);
  this.acceleration.add(f);
}

Particle.prototype.edges = function() {
  if(this.position.y > height) {
    this.velocity.y *= -1;
    this.position.y = height;
  }
  if(this.position.y < 0) {
    this.velocity.y *= -1;
    this.position.y = 0
  }
  if(this.position.x > width) {
    this.velocity.x *= -1;
    this.position.x = width;
  }
  if(this.position.x < 0) {
    this.velocity.x *= -1;
    this.position.x = 0;
  }
}

var Attractor = function(inX, inY) {
  this.position = createVector(inX, inY);
  this.mass = 20;
  this.G = 1
}

Attractor.prototype.display = function() {
  stroke(126);
  ellipse(this.position.x, this.position.y, 50, 50);
}


Attractor.prototype.calculateAttraction = function(inParticle) {
  var force = p5.Vector.sub(this.position,inParticle.position);  
  var distance = force.mag();
  
  distance = constrain(distance, 5, 25);
  force.normalize();
  var strength = (this.G * this.mass * inParticle.mass) / (distance * distance); 

  force.mult(strength);
  return force;
}

