let myChart;
let div;
let RK;
let frame;
let drag=0;
let heat = 0;
let pendulum_length=10
let t_0;
var s1 = function(sketch){
  // sketchy=sketch
  sketch.preload = preloads1(sketch,500)
  sketch.setup = setups1(sketch)
  sketch.draw = drawy(sketch)
  sketch.windowResized= function(){
    console.log('sd')
    height = width
    // if screensize less than 900px, then double height and width
  
    // width = document.querySelector('.fixed-width-div').offsetLeft;
    // height = width;
    // height = document.querySelector('.fixed-width-div').offsetHeight;
    console.log(width,height)
    
    sketch.velocitySlider.style('top', `${sketch.canvas.offsetTop +(445/500)*height}px`);
    sketch.lengthSlider.style('top', `${sketch.canvas.offsetTop+(390/500)*height}px`);
    sketch.thetaSlider.style('top', `${sketch.canvas.offsetTop+(390/500)*height}px`);
    sketch.dragSlider.style('top', `${sketch.canvas.offsetTop +(445/500)*height}px`);
    sketch.velocitySlider.style('left', `${sketch.canvas.offsetLeft + (255/500)*width}px`);
    sketch.lengthSlider.style('left', `${sketch.canvas.offsetLeft + (255/500)*width}px`);
    sketch.dragSlider.style('left', `${sketch.canvas.offsetLeft + (80/500)*width}px`);
    sketch.thetaSlider.style('left', `${sketch.canvas.offsetLeft + (72/500)*width}px`);
  
    sketch.currCamera.setPosition(0, 0, 50);
  }


}
new p5(s1);
var s2 = function( sketch ) {
  sketch.preload = preloads1(sketch);
  sketch.setup = function() {
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
  // B/c of indirect calculation, errors between KE and GPE cause small leftovers, so I hid the bug

  heatColor = "#ffff00"
  KEColor = "#00bfff"
  GPEColor = "#00ff00"
  if(heat>300){
    heat = 300
    heatColor ="#ff0000"
  }
  if(Math.abs(KE)>300){
    KE = 300
    KEColor= "#0000ff"
  }
  if(GPE>300){
    GPE = 300
    GPEColor="#006400"

  }
  // Handles the changing of colors to indicate the hitting of max values
  // Stop the KEbar and Heat bar from overflowing, istead change the color when it reaches the top to indicate it
  
  
  sketch.background("#191a1a");
  sketch.fill(255)
  sketch.noStroke()
  sketch.textSize(30);
  sketch.text("Energy",10,70)
  sketch.textSize(20);
  // Energy title
  
  

  
  sketch.strokeWeight(1);
  sketch.stroke("#0060df");
  sketch.fill(GPEColor)
   sketch.rect(0, 450, 50,-GPE );
  //  GPE Rectangle^
   

   sketch.fill(KEColor)
   sketch.rect(50,450,50,-(KE))
   sketch.fill(heatColor)
   sketch.rect(100, 450, 50,-heat );
  //  Heat Rectangle ^^



  
   sketch.fill(GPEColor) 
   sketch.noStroke()
   sketch.text("GPE",2,475)
   sketch.textSize(20);

   sketch.fill(KEColor)
   sketch.text("KE",60,475)
   sketch.fill(0,255,0)
   sketch.textSize(15);
   
   sketch.fill(heatColor)
   sketch.text("HEAT",105,473)
   
   

   



 }
};
new p5(s2);

// Ideal pivot point is at 10


