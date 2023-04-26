let myChart;
let div;
let RK;
let frame;
let drag = 0;
let heat = 0;
let pendulum_length = 10
let t_0;
offsetBars = 0;
let spring_constant = 1

let energy= [];
// TODO- 
// 1. ADD 3 MORE SLIDERS, DRIVING AMPLITUDE, DRIVING PHASE, AND DRIVING FREQUENCY
// Just make the current driving force function into an operator which returns a driving function
// If driving stuff is on, turn off the bar graphs
// 2. ADD TWO NEW GRAPHS, HOMOGENOUS SOLUTION, AND DRIVING FORCE
// Need to have the RK function either run twice (?), or return all three required position types in an array, then refactor

// 3. MAKE IT LOOK NICE- Have a checkbox to enable the driving stuff, which then changes the UI a bit, the current graph on the right
// should be in a flexible div split into 3 rows, top is sum solution, second is homogenous solution, and bottom is driving force
// On the top right of the p5 sketch should be the switch to make it happen 
// 4. A Splash instruction menu?



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
    sketch.vertex(this.start.x, this.start.y);
    for (let i = 0; i < this.numLines; i++) {
      sketch.vertex(this.points[i].x, this.points[i].y);
    }
    sketch.vertex(this.current_end.x, this.current_end.y);
    sketch.endShape();
  }
  
  move(displacement) {
    // Move the endpoint
    this.current_end.x = this.end.x+displacement;
    
    // Recalculate the position of all the other points
    for (let i = 0; i < this.numLines; i++) {
      const x = this.map(i, 0, this.numLines - 1, this.start.x, this.current_end.x);
      const y = this.start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
      this.points[i] = this.createVector(x, y);
    }
    
  }



}


isSpring = false

let switchElem = document.getElementById("mySwitch");
let switchLabel = switchElem.parentElement;
switchElem.checked = isSpring;
switchElem.addEventListener("change", function() {
  if (switchElem.checked) {
    switchLabel.classList.add("pendulum-on");
  } else {
    switchLabel.classList.remove("pendulum-on");
  }
});



const mySwitch = document.getElementById("mySwitch");
 switchLabel = mySwitch.labels[0];
mySwitch.addEventListener("change", function() {
  isSpring = this.checked;
  oscilator.remove()
  let allCharts = Chart.instances;

// Loop through all chart instances and destroy each one
  Chart.helpers.each(allCharts, function(chartInstance) {
    chartInstance.destroy();
  });
  oscilator = new p5(s1)
  
  // if (mySwitch.checked) {
  //   switchLabel.innerText = "Pendulum";
  // } else {
  //   switchLabel.innerText = "Spring";
  // }
});


function theholySketch(sketch){
  if(isSpring){
    setupSpring(sketch)
  }
  else{
    setups1(sketch)
  }
}

function theholyDraw(sketch){
  if(isSpring){
    drawSpring(sketch)
  }
  else{
    drawy(sketch)
  }
}
function theHolyWindowResized(sketch){
  if(isSpring){
    windowResizedSpring(sketch)
  }
  else{
    windowResized(sketch)
  }
}

var s1 = function(sketch) {
  // sketch=sketch
  sketch.preload = preloads1(sketch, 500)
  if(!isSpring){
    sketch.setup = setups1(sketch)
    sketch.draw = drawy(sketch)
    sketch.windowResized = function() {
      console.log('sd')
      offsetSlider = 30
      height = width
      // if screensize less than 900px, then double height and width

      // width = document.querySelector('.fixed-width-div').offsetLeft;
      // height = width;
      // height = document.querySelector('.fixed-width-div').offsetHeight;
      console.log(width, height)


      sketch.velocitySlider.style('left', `${sketch.canvas.offsetLeft + ((255) / 500) * width}px`);
      sketch.velocitySlider.style('top', `${sketch.canvas.offsetTop + (((445 - offsetSlider)) / 500) * height}px`);

      sketch.lengthSlider.style('top', `${sketch.canvas.offsetTop + ((390 - offsetSlider) / 500) * height}px`);
      sketch.lengthSlider.style('left', `${sketch.canvas.offsetLeft + ((255) / 500) * width}px`);

      sketch.thetaSlider.style('top', `${sketch.canvas.offsetTop + ((390 - offsetSlider) / 500) * height}px`);
      sketch.thetaSlider.style('left', `${sketch.canvas.offsetLeft + (80 / 500) * width}px`);


      sketch.dragSlider.style('top', `${sketch.canvas.offsetTop + ((445 - offsetSlider) / 500) * height}px`);
      sketch.dragSlider.style('left', `${sketch.canvas.offsetLeft + (80 / 500) * width}px`);

      sketch.amplitudeSlider.style('top', `${sketch.canvas.offsetTop + ((500 - offsetSlider) / 500) * height}px`);
      sketch.amplitudeSlider.style('left', `${sketch.canvas.offsetLeft + (80 / 500) * width}px`);

      sketch.freqSlider.style('top', `${sketch.canvas.offsetTop + ((500 - offsetSlider) / 500) * height}px`);
      sketch.freqSlider.style('left', `${sketch.canvas.offsetLeft + (255 / 500) * width}px`);

      sketch.currCamera.setPosition(0, 0, 50);
    }
    
  }
  else{

    sketch.setup = setupSpring(sketch)
    sketch.draw = springDrawy(sketch)
    sketch.windowResized = function() {
      console.log('sd')
      offsetSlider = 30
      height = width
      // if screensize less than 900px, then double height and width

      // width = document.querySelector('.fixed-width-div').offsetLeft;
      // height = width;
      // height = document.querySelector('.fixed-width-div').offsetHeight;
      console.log(width, height)


      sketch.velocitySlider.style('left', `${sketch.canvas.offsetLeft + ((255) / 500) * width}px`);
      sketch.velocitySlider.style('top', `${sketch.canvas.offsetTop + (((445 - offsetSlider)) / 500) * height}px`);

      sketch.lengthSlider.style('top', `${sketch.canvas.offsetTop + ((390 - offsetSlider) / 500) * height}px`);
      sketch.lengthSlider.style('left', `${sketch.canvas.offsetLeft + ((255) / 500) * width}px`);

      sketch.thetaSlider.style('top', `${sketch.canvas.offsetTop + ((390 - offsetSlider) / 500) * height}px`);
      sketch.thetaSlider.style('left', `${sketch.canvas.offsetLeft + (80 / 500) * width}px`);


      sketch.dragSlider.style('top', `${sketch.canvas.offsetTop + ((445 - offsetSlider) / 500) * height}px`);
      sketch.dragSlider.style('left', `${sketch.canvas.offsetLeft + (80 / 500) * width}px`);

      sketch.amplitudeSlider.style('top', `${sketch.canvas.offsetTop + ((500 - offsetSlider) / 500) * height}px`);
      sketch.amplitudeSlider.style('left', `${sketch.canvas.offsetLeft + (80 / 500) * width}px`);

      sketch.freqSlider.style('top', `${sketch.canvas.offsetTop + ((500 - offsetSlider) / 500) * height}px`);
      sketch.freqSlider.style('left', `${sketch.canvas.offsetLeft + (255 / 500) * width}px`);
      sketch.text("Spring Constant: " + Math.round(sketch.lengthSlider.value()) + "N/m", 155, 250);

      sketch.text("Initial Velocity: " + sketch.velocitySlider.value()/10 + "m/s",155, 310);
      sketch.text("Displacement: " + Math.round(sketch.thetaSlider.value())/10 + "m", -15, 250)
      sketch.text("Drag: " + sketch.dragSlider.value(), -15, 310);
      sketch.text("Driver Amplitude: " + sketch.amplitudeSlider.value() + "N", -15, 370);
      sketch.text("Driver Frequency: " + sketch.freqSlider.value(), 155, 370);



      // sketch.currCamera.setPosition(0, 0, 50);
    }

  }
  


}
var springSketch = function(sketch) {
  
  // sketch=sketch
  


}


function receiveSliderValues(event) {
  // Check if the message is for slider values
  if (event.data.type === 'sliderValues') {
    // Update the sketch's variables with the new slider values
    amplitude = event.data.amplitude;
    frequency = event.data.frequency;
    RK = event.data.RK;
  }
}
var energybarCharts = function(sketch) {
  sketch.preload = preloads1(sketch);
  sketch.setup = function() {
    console.log('here')
    window.addEventListener('message', receiveSliderValues);

    sketch.textFont(myFont);
    let canvas2 = sketch.createCanvas(150, 500);
    canvas2.parent("barcharts")

    heat = 0

  }

  sketch.draw = function() {
    // Big uses here is to calculate energy


    // GPE
    heightPendulum = pendulum_length * (Math.cos(RK[0][frame]) - 1)



    GPE = -9.8 * heightPendulum
    // SPRINGENERGY
    SE = .5*spring_constant*(RK[0][frame]**2)

    // HEY AZAL, FIX THIS LATER FOR READABILITY
    if(isSpring){
      GPE = SE
    }

    // old heat code, to be restored?
    if (frame == 1) {
      heat = drag * Math.abs(RK[2][0]) * (frame / 24)
      // mass of pendulum

    }
    else {
      //for canvas 2

      increment = drag * Math.abs(RK[2][frame]) * (frame / 24);
      heat += increment;
    }
    velocity = RK[2][frame]
    
    if(isSpring){
      TE = spring_constant*(RK[0][0]**2) + (.5*RK[2][0] ** 2)
      // 1/2kx^2 + 1/2mv^2
    }
    else{
      TE = -9.8 * pendulum_length * (Math.cos(RK[0][0]) - 1) + 1.2 * pendulum_length ** 2 * RK[2][0] ** 2
    }
    // Current heat method relies on indirect calculation from the total energy


    KE = 1.2 * (pendulum_length ** 2) * (velocity ** 2)
    // (1/2)*I*w^2

    if (KE < 0) {
      KE = 0
    }
    
    // Stops weird bouncing of KE bug 
    if(isSpring){

      heat = -TE + (Math.abs(SE)+Math.abs(KE))
    }
    else{
      heat = TE - (Math.abs(GPE)+Math.abs(KE))
    }
    
    if (drag == 0) {
      heat = 0
    }
    // if(heat>0){
    //   heat = 0
    // }


    // if (oscilator.sketch.amplitudeSlider.value()!=0 || s1.sketch.freqSlider.value()!=0){
    //   heat = 0
    // }
    // B/c of indirect calculation, errors between KE and GPE cause small leftovers, so I hid the bug

    heatColor = "#ffff00"
    KEColor = "#00bfff"
    GPEColor = "#00ff00"
    if(!isSpring){
      roundingFactor = 10
    }
    else{
      roundingFactor = 100000
    }
    if(!isSpring){

      GPEheight = GPE
      heatHeight = heat
      KEheight = KE
    }
    else{
      GPEheight = 600*SE/(roundingFactor)
      heatHeight = -heat/(roundingFactor/7)
      KEheight = KE/(roundingFactor/7)
    }

    if (heatHeight > 300) {
      heatHeight = 300
      heatColor = "#ff0000"
    }
    if (Math.abs(KEheight) > 300) {
      KEheight = 300
      KEColor = "#0000ff"
    }
    if (GPEheight > 300) {
      GPEheight = 300
      GPEColor = "#006400"

    }
    // Handles the changing of colors to indicate the hitting of max values
    // Stop the KEbar and Heat bar from overflowing, istead change the color when it reaches the top to indicate it




    // GPEheight = energy.potentialEnergy[frame]
    // heatHeight = energy.heat[frame]
    // KEheight = energy.kineticEnergy[frame]

    sketch.background("#191a1a");
    sketch.fill(255)
    sketch.noStroke()
    sketch.textSize(29);
    sketch.text("Energy (J)", 0, 70)
    sketch.textSize(20);
    // Energy title




    sketch.strokeWeight(1);
    sketch.stroke(100);
    sketch.fill('#191a1a')
    sketch.rect(offsetBars, 450, 50, -300)
    sketch.stroke("#0060df");
    sketch.fill(GPEColor)
    sketch.rect(offsetBars, 450, 50, -GPEheight);
    //  GPE Rectangle^
    sketch.fill('#191a1a')
    sketch.stroke(100);
    sketch.rect(50 + offsetBars, 450, 50, -300)
    sketch.stroke("#0060df");
    sketch.fill(KEColor)
    sketch.rect(50 + offsetBars, 450, 50, -(KEheight))
    
    //  

    //  Heat Rectangle ^^
    




    sketch.fill(GPEColor)
    sketch.noStroke()
    if(!isSpring){
      sketch.text("GPE", 2 + offsetBars, 475)
    }
    else{
      sketch.text("SE", 12 + offsetBars, 475)
    }
    energyIndicatorSize = 20
    if ((Math.round(KE).toString().length > 3)) {
      energyIndicatorSize = 20 - (Math.round(KE/roundingFactor).toString().length) - 1
    }
    else {
      energyIndicatorSize = 20
    }

    sketch.textSize(energyIndicatorSize);

    sketch.fill('#00ff00')
    sketch.text(Math.round(GPE / roundingFactor), offsetBars, 150)
    sketch.textSize(20);

    sketch.fill(KEColor)
    sketch.text("KE", 60 + offsetBars, 475)
    sketch.fill(0, 255, 0)

    sketch.fill(KEColor)
    energyIndicatorSize = 20
    if ((Math.round(KE).toString().length > 3)) {
      energyIndicatorSize = 20 - (Math.round(KE/roundingFactor).toString().length) - 1
    }
    else {
      energyIndicatorSize = 20
    }
    sketch.fill('#00bfff')
    sketch.textSize(energyIndicatorSize);
    sketch.text(Math.round(KE / roundingFactor), 50 + offsetBars, 150)
    sketch.fill(0, 255, 0)




    if (amplitude != 0 && frequency != 0 || isSpring) {

      heat = 0
      offsetBars = 20
      console.log(offsetBars)
    }
    

    else if(!isSpring){
      offsetBars = 0
      sketch.strokeWeight(1);
      sketch.stroke("#0060df");
      sketch.fill(heatColor)
      sketch.textSize(15);
      sketch.text("HEAT", 105, 473)
      sketch.fill('#191a1a')
      sketch.stroke(100);
      sketch.rect(100 + offsetBars, 450, 50, -300)
      sketch.fill(heatColor)
      sketch.rect(100, 450, 50, -heatHeight);
      energyIndicatorSize = 20
      if ((Math.round(heat).toString().length > 3)) {
        energyIndicatorSize = 20 - (Math.round(heat).toString().length) - 1
        console.log('smaller')
      }
      else {
        energyIndicatorSize = 20
      }
      sketch.fill("#ffff00")
      sketch.textSize(energyIndicatorSize);
      sketch.text(Math.round(heat / roundingFactor) * roundingFactor, 100 + offsetBars, 150)


    }
  }
};

// spring = new p5(springSketch)

new p5(energybarCharts);
oscilator = new p5(s1)



