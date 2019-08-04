var speed = 0.1;
var maxSpeed = 2;

var Particle = function(inPosition, inRadius, inMouseRadius) {
  this.position = inPosition; 
  this.velocity = createVector(random(-1, 1), random(-1, -1));
  this.radius = inRadius;
  this.mouseRadius = inMouseRadius;
}

Particle.prototype.update = function(inParticles, index) {
  // Map the position to be from 0 to 255
  var h = map(this.position.x, 0, height, 0, 255);
  // Make the particle move
  this.position.add(this.velocity);

  // when the particle goes out of bounds
  if(this.position.x < -10) this.position.x = width;
  if(this.position.x > width + 10) this.position.x = 0;
  if(this.position.y < -10) this.position.y = height;
  if(this.position.y > height + 10) this.position.y = 0;

  // constrain the speed
  this.velocity.x = constrain(this.velocity.x + random(-speed, speed), -maxSpeed, maxSpeed);
  this.velocity.y = constrain(this.velocity.y + random(-speed, speed), -maxSpeed, maxSpeed);

  for(var j = index + 1; j < inParticles.length; ++j) {
    var angle = atan2(this.position.y -  inParticles[j].position.y, this.position.x - inParticles[j].position.x);
    var dist = this.position.dist(inParticles[j].position);

    if(dist < this.radius) {
      stroke(h, 255, map(dist, 0, this.radius, 255, 0));
      strokeWeight(map(dist, 0, this.radius, 2, 0));
      line(this.position.x, this.position.y, inParticles[j].position.x, inParticles[j].position.y);
      var force = map(dist, 0, this.radius, 5, 0);
      this.velocity.x += force * cos(angle);
      this.velocity.y += force * sin(angle);
    }
  }

  var angle = atan2(this.position.y - mouseY, this.position.x - mouseX);
  var dist = this.position.dist(createVector(mouseX, mouseY));

  if(dist < this.radius) {
    var force = map(dist, 0, this.radius, 50, 0);
    this.velocity.x += force * cos(angle);
    this.velocity.y += force * sin(angle);
  }

  noStroke();
  fill(h, 255, 255);
  ellipse(mouseX, mouseY, 30, 30);
  ellipse(this.position.x, this.position.y, random(5), random(5));
}
