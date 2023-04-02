class Box {
    constructor(x, y, n, w, h) {
      this.x_i = x; // initial x position
      this.x =x
      this.y = y; // initial y position
      this.n = n; // value of the box
      this.delta = 0; // current displacement on x
      this.width = w; // width of the box
      this.height = h; // height of the box
    }
    move(delta) {
      this.x = this.x_i + delta;
    }
    draw(sketch) {
      sketch.fill(0,1,0);
      sketch.rect(this.x, this.y, this.width, this.height);
      
      sketch.fill(0);
    //   sketch.textSize(16);
    //   sketch.text(this.n, this.x + this.displacement + this.width / 2, this.y + this.height / 2 + 6);
    }
  }
  // I need to make a function that takes the variable N, and constructs that many boxes in p5
class Spring {
  createVector(x,y){
    return {x:x,y:y}
  }
  map(value, min1, max1, min2, max2) {
    // first, normalize the input value to a range between 0 and 1
    const normalized = (value - min1) / (max1 - min1);
    
    // then, map the normalized value to the output range
    const mapped = normalized * (max2 - min2) + min2;
    
    // return the mapped value
    return mapped;
  }
  constructor(length = 200, numLines=5,x_i=width/2,y_i=height/2,thickness=10,springheight = 10) {
    
    // Initialize start and end points
    x_i = length/2 + x_i
    y_i = y_i*2
    this.start = this.createVector(x_i - length / 2, y_i / 2);
    console.log(this.start)
    this.end = this.createVector(x_i / 2 + length / 2, y_i / 2);
    this.current_end =this.createVector(x_i / 2 + length / 2, y_i / 2);
    this.current_start = this.createVector(x_i - length / 2, y_i / 2);
    this.thickness = thickness
    
    // Initialize properties of the zigzag
    this.numLines = numLines;
    this.lineLength =  springheight;
    
    // Initialize an array to hold the points of the zigzag
    this.points = [];
    for (let i = 0; i < numLines; i++) {
      const x = this.map(i, 0, numLines - 1, this.start.x, this.current_end.x);
      const y = this.start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
      this.points.push(this.createVector(x, y));
    }
  }
  
  draw(sketch) {
    // Draw the zigzag on the canvas
    sketch.beginShape();
    sketch.fill(0,0,0,0)
    sketch.strokeWeight(this.thickness)
    sketch.vertex(this.current_start.x, this.start.y);
    for (let i = 0; i < this.numLines; i++) {
      sketch.vertex(this.points[i].x, this.points[i].y);
    }
    sketch.vertex(this.current_end.x, this.current_end.y);
    sketch.endShape();
    
  }
  
  move(end_displacement,start_displacement) {
    // Move the endpoint
    this.current_end.x = end_displacement;
    this.current_start.x = start_displacement;
    // Recalculate the position of all the other points
    for (let i = 0; i < this.numLines; i++) {
      const x = this.map(i, 0, this.numLines - 1, this.current_start.x, this.current_end.x);
      const y = this.current_start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
      this.points[i] = this.createVector(x, y);
    }
    
  }



}
function updateSim() {
  function smileyface(){
    frame = 0

  
    // same reason as setups for weird function return logic
      N = slider1.value()
      spring_constant = slider2.value()
      mass = slider3.value()

      initial_position = -slider4.value()
      // log each of the new inputs
      console.log(N)
      console.log(spring_constant)
      console.log(mass)
      console.log(initial_position)
      oscillator_List = []

      oscillator_List = Simulator(N,wallMount, mass, spring_constant, initial_position);
      boxArray = []
      springArray = []
      for(let i = 0; i<oscillator_List.length; i++){
          boxArray.push(new Box(100+i*150, 200, 10, 50, 50))
          springConstant = oscillator_List[i].spring_constant
          springArray.push(new Spring(length = 150,numLines=5*springConstant,x_i = i*150,y_i = 225,thickness = 1,springheight = 5))
      }
}
return smileyface()
}