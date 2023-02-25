let myChart;
let div;
let RK;
let frame;
let drag=0;
let heat = 0;
let pendulum_length=10
let t_0;
offsetBars=0;
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
var s1 = function(sketch){
  // sketch=sketch
  sketch.preload = preloads1(sketch,500)
  sketch.setup = setups1(sketch)
  sketch.draw = drawy(sketch)
  sketch.windowResized= function(){
    console.log('sd')
    offsetSlider=30
    height = width
    // if screensize less than 900px, then double height and width
  
    // width = document.querySelector('.fixed-width-div').offsetLeft;
    // height = width;
    // height = document.querySelector('.fixed-width-div').offsetHeight;
    console.log(width,height)
    

    sketch.velocitySlider.style('left', `${sketch.canvas.offsetLeft + ((255)/500)*width}px`);
    sketch.velocitySlider.style('top', `${sketch.canvas.offsetTop +(((445-offsetSlider))/500)*height}px`);

    sketch.lengthSlider.style('top', `${sketch.canvas.offsetTop+((390-offsetSlider)/500)*height}px`);
    sketch.lengthSlider.style('left', `${sketch.canvas.offsetLeft + ((255)/500)*width}px`);

    sketch.thetaSlider.style('top', `${sketch.canvas.offsetTop+((390-offsetSlider)/500)*height}px`);
    sketch.thetaSlider.style('left', `${sketch.canvas.offsetLeft + (80/500)*width}px`);


    sketch.dragSlider.style('top', `${sketch.canvas.offsetTop +((445-offsetSlider)/500)*height}px`);
    sketch.dragSlider.style('left', `${sketch.canvas.offsetLeft + (80/500)*width}px`);

    sketch.amplitudeSlider.style('top', `${sketch.canvas.offsetTop+((500-offsetSlider)/500)*height}px`);
    sketch.amplitudeSlider.style('left', `${sketch.canvas.offsetLeft + (80/500)*width}px`);

    sketch.freqSlider.style('top', `${sketch.canvas.offsetTop+((500-offsetSlider)/500)*height}px`);
    sketch.freqSlider.style('left', `${sketch.canvas.offsetLeft + (255/500)*width}px`);
  
    sketch.currCamera.setPosition(0, 0, 50);
  }


}
oscilator = new p5(s1);
function receiveSliderValues(event) {
  // Check if the message is for slider values
  if (event.data.type === 'sliderValues') {
    // Update the sketch's variables with the new slider values
    amplitude = event.data.amplitude;
    frequency = event.data.frequency;
  }
}
var energybarCharts = function( sketch ) {
  sketch.preload = preloads1(sketch);
  sketch.setup = function() {
    window.addEventListener('message', receiveSliderValues);
    sketch.textFont(myFont);    
    let canvas2 = sketch.createCanvas(150, 500);
    canvas2.parent("barcharts")

    heat = 0
   
    }
  
 sketch.draw = function() {
  // Big uses here is to calculate energy


  // GPE
  heightPendulum = pendulum_length*(Math.cos(RK[0][frame])-1)
  GPE = -9.8*heightPendulum
  // old heat code, to be restored?
  if (frame == 1){
    heat = drag*Math.abs(RK[2][0])*(frame/24)
    // mass of pendulum
    
  }
  else{
   //for canvas 2
    
    increment= drag*Math.abs(RK[2][frame])*(frame/24);
    heat +=increment;
  }
  velocity =RK[2][frame]
  TE=-9.8*pendulum_length*(Math.cos(RK[0][0])-1)+1.2*pendulum_length**2*RK[2][0]**2
  // Current heat method relies on indirect calculation from the total energy


  KE = 1.2*(pendulum_length**2)*(velocity**2)
  // (1/2)*I*w^2

  if (KE<0){
    KE=0
  }
  // Stops weird bouncing of KE bug 
  
  heat = TE-GPE-KE
  if (drag ==0){
    heat = 0
  }

  
  // if (oscilator.sketch.amplitudeSlider.value()!=0 || s1.sketch.freqSlider.value()!=0){
  //   heat = 0
  // }
  // B/c of indirect calculation, errors between KE and GPE cause small leftovers, so I hid the bug

  heatColor = "#ffff00"
  KEColor = "#00bfff"
  GPEColor = "#00ff00"
  GPEheight = GPE
  heatHeight = heat
  KEheight = KE
  if(heat>300){
    heatHeight = 300
    heatColor ="#ff0000"
  }
  if(Math.abs(KE)>300){
    KEheight = 300
    KEColor= "#0000ff"
  }
  if(GPE>300){
    GPEheight = 300
    GPEColor="#006400"

  }
  // Handles the changing of colors to indicate the hitting of max values
  // Stop the KEbar and Heat bar from overflowing, istead change the color when it reaches the top to indicate it
  
  
      
  sketch.background("#191a1a");
  sketch.fill(255)
  sketch.noStroke()
  sketch.textSize(29);
  sketch.text("Energy (J)",0,70)
  sketch.textSize(20);
  // Energy title
  
  

  
  sketch.strokeWeight(1);
  sketch.stroke(100);
  sketch.fill('#191a1a')
  sketch.rect(offsetBars,450,50,-300)
  sketch.stroke("#0060df");
  sketch.fill(GPEColor)
   sketch.rect(offsetBars, 450, 50,-GPEheight );
  //  GPE Rectangle^
  sketch.fill('#191a1a')
  sketch.stroke(100);
  sketch.rect(50+offsetBars,450,50,-300)
  sketch.stroke("#0060df");
   sketch.fill(KEColor)
   sketch.rect(50+offsetBars,450,50,-(KEheight))
  //  
   
  //  Heat Rectangle ^^



  
   sketch.fill(GPEColor) 
   sketch.noStroke()
   sketch.text("GPE",2+offsetBars,475)
   energyIndicatorSize = 20
    if((Math.round(KE).toString().length>3)){
      energyIndicatorSize = 20-(Math.round(KE).toString().length)-1
      console.log('smaller')
    }
    else{
      energyIndicatorSize = 20
    }
    
    sketch.textSize(energyIndicatorSize);

    sketch.fill('#00ff00')
   sketch.text(Math.round(GPE/10)*10,offsetBars,150)
   sketch.textSize(20);

   sketch.fill(KEColor)
   sketch.text("KE",60+offsetBars,475)
   sketch.fill(0,255,0)
   
   sketch.fill(KEColor)
   energyIndicatorSize = 20
    if((Math.round(KE).toString().length>3)){
      energyIndicatorSize = 20-(Math.round(KE).toString().length)-1
      console.log('smaller')
    }
    else{
      energyIndicatorSize = 20
    }
    sketch.fill('#00bfff')
    sketch.textSize(energyIndicatorSize);
   sketch.text(Math.round(KE/10)*10,50+offsetBars,150)
   sketch.fill(0,255,0)
   
   
   
   
   if (amplitude!=0 && frequency!=0){
    
    heat = 0
    offsetBars =20
    console.log(offsetBars)
  }
  else{
    
    offsetBars=0
    sketch.strokeWeight(1);
  sketch.stroke("#0060df");
    console.log('heat')
    sketch.fill(heatColor)
    sketch.textSize(15);
    
    sketch.text("HEAT",105,473)
    sketch.fill('#191a1a')
    sketch.stroke(100);
    sketch.rect(100+offsetBars,450,50,-300)
    
    sketch.fill(heatColor)
    sketch.rect(100, 450, 50,-heatHeight );
    energyIndicatorSize = 20
    if((Math.round(heat).toString().length>3)){
      energyIndicatorSize = 20-(Math.round(heat).toString().length)-1
      console.log('smaller')
    }
    else{
      energyIndicatorSize = 20
    }
    sketch.fill("#ffff00")
    sketch.textSize(energyIndicatorSize);
    sketch.text(Math.round(heat/10)*10,100+offsetBars,150)
   

  }

   
   

   



 }
};
new p5(energybarCharts);

// Ideal pivot point is at 10


