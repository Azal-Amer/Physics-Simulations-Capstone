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
  //  canvas2.position(600,0);
  //  console.log(RK[2])
  //  console.log(heat)
  heat = 0
   
 }
 sketch.draw = function() {
  heightPendulum = pendulum_length*(Math.cos(RK[0][frame])-1)
  GPE = -9.8*heightPendulum
  
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


  KE = 1.2*(pendulum_length**2)*(velocity**2)
  // KE = TE-GPE-(heat)
  if (KE<0){
    KE=0
  }
  
  // console.log(GPE+KE+heat*2)
  heat = TE-GPE-KE
  if (drag ==0){
    heat = 0
  }

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
  // Stop the KEbar and Heat bar from overflowing, istead change the color when it reaches the top to indicate it
  
  
  sketch.background("#191a1a");
  sketch.fill(255)
  sketch.noStroke()
  sketch.textSize(30);
  sketch.text("Energy",10,70)
  sketch.textSize(20);
  
  

  
  sketch.strokeWeight(1);
  sketch.stroke("#0060df");


  sketch.fill(GPEColor)
   sketch.rect(0, 450, 50,-GPE );
   

   sketch.fill(KEColor)
   sketch.rect(50,450,50,-(KE))
   sketch.fill(heatColor)
   sketch.rect(100, 450, 50,-heat );



   

   

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


