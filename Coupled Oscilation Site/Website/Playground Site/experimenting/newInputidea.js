let xSpacing = 5;
let amplitude = 0;
let frequency = .001;
let phase = 0;

let xOffset = 0;
let yOffset = 0;

let start, end;

let controlPoints = [];

function setup() {
  createCanvas(800, 600);
  start = 0
  end = width;
  for (let i = 0; i < 2; i++) {
    controlPoints[i] = new ControlPoint(start + i*width/2, height/2);
  }
}

function draw() {
  background(255);
  
  // Draw the graph
  stroke(0);
  noFill();
  beginShape();
  for (let x = start; x <= end; x += xSpacing) {
    let y = amplitude * sin(frequency*(x + phase));
    vertex(xOffset + x, yOffset + height/2 - y);
  }
  endShape();
  
  // Draw the control points
  for (let i = 0; i < controlPoints.length; i++) {
    controlPoints[i].display();
  }
}

function mouseDragged() {
  
  // Check if the mouse is dragging a control point
  for (let i = 0; i < controlPoints.length; i++) {
    if (controlPoints[i].dragging) {
      // Update the control point's position based on mouse movement
      controlPoints[i].x = mouseX;
      if(i!=0){
        controlPoints[i].y = mouseY;
      }
      
      
      // Update graph properties based on control point positions
      if (i === 0) {
        xOffset = controlPoints[i].x - start;
      } else if (i === 1) {
        let x = controlPoints[i].x - xOffset;
        let y = height/2 - yOffset - amplitude * sin(frequency*(x + phase));
        amplitude = controlPoints[1].y-height/2;
        frequency = 2*TWO_PI/(controlPoints[1].x-controlPoints[0].x);
      }
    }
  }
  
}

function mousePressed() {
  // Check if the mouse is clicking a control point
  for (let i = 0; i < controlPoints.length; i++) {
    if (controlPoints[i].over(mouseX, mouseY)) {
      controlPoints[i].dragging = true;
    }
  }
}

function mouseReleased() {
  
  
  // Stop dragging any control points
  for (let i = 0; i < controlPoints.length; i++) {
    controlPoints[i].dragging = false;
  }
}

class ControlPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.dragging = false;
  }
  
  over(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.size/2) {
      return true;
    } else {
      return false;
    }
  }
  
  display() {
    if (this.dragging) {
      fill(50);
    } else {
      fill(200);
    }
    stroke(0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
