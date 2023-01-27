let myChart;
function createChart(xValues, yValues) {

  RK1 = Smoother([yValues.slice(),xValues.slice()]);
  yValues=RK1[0]
  xValues=RK1[1]
  rounded = xValues.map(Math.round)
  degreesArray = yValues.map(val => val*57.2957805);

  console.log('woof')
  // Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");

  // Create a new chart using the chart.js library
  Chart.defaults.color = "#8c8c8c";
  var myChart = new Chart(ctx, {
    type: 'line',
    pointRadius: .1,
    pointHoverRadius: .1,

    data: {
      labels: rounded,
      datasets: [{
        label: 'Displacement Graph  ',
        data: degreesArray,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: '#1566e4',
        borderWidth: 1,
        hoverOffset: 4
      }]
    }
    ,
    options: {
      scales: {
        y: {
          title:{
            display:true,
            text:'Degrees'
          },
          grid: {
            color: '#3c3c3c'
          }
        },
        x: {
          title:{
            display:true,
            text:'Seconds'
          },
          grid:{
            color:'#3c3c3c'
          }
        },
    },
    maintainAspectRatio: false

  },
  });
  return myChart
}

// const algor = require('./simulating/Approximating Algorithms.js');
function preload(){
    myFont= loadFont('/Assets/HussarBold.otf');
    
}


function setup() {
  div = document.querySelector('.fixed-width-div');

  // height = 500
  // width = 500
  let scaleX=1;
  let scaleY = 1
  if(windowWidth/windowHeight<900){
    scaleX=2;
    scaleY=1.45
  }
  else{
    scaleX=1
    scaleY=1
  }

    
    if(windowWidth/windowHeight<1){
      width = windowWidth
      height = windowWidth
    }

    else{
      width = 500;
      height = 500;
    }
    
    var myCanvas = createCanvas(height, width,WEBGL);
    myCanvas.parent('canvas-container');
    angle = 0;
    time = 10;
    pendulum_length = 10

    stepSize = .001;
    RK = RK4(x_0,v_0,time,stepSize,A,B,C,D,zerothOrderParam(pendulum_length),firstOrderParam);
    RKx = RK[0];
    
    width = width*scaleX
    height = width*scaleY
    
    
    
    framerate = RKx.length*10/time;
    frameRate(framerate);
    frame = 0
    currCamera = createCamera();

    dragSlider = createSlider(0, 5, 0,.1);
    dragSlider.style('position', 'absolute  ');
    dragSlider.style('top', `${canvas.offsetTop +(445/500)*height}px`);
    

    
    thetaSlider = createSlider(-Math.PI/2,Math.PI/2,0,.01)
    thetaSlider.style('position', 'absolute');
    thetaSlider.style('top', `${canvas.offsetTop+(390/500)*height}px`);
    

    
    velocitySlider = createSlider(0,10,0,.1)
    velocitySlider.style('position', 'absolute  ');
    velocitySlider.style('top', `${canvas.offsetTop +(445/500)*height}px`);

    
    
    


    lengthSlider = createSlider(.1,25,pendulum_length,.1)
    lengthSlider.style('position', 'absolute  ');
    lengthSlider.style('top', `${canvas.offsetTop+(390/500)*height}px`);
    dragSlider.style('left', `${canvas.offsetLeft + (72/500)*width}px`);
    thetaSlider.style('left', `${canvas.offsetLeft + (72/500)*width}px`);
    velocitySlider.style('left', `${canvas.offsetLeft + (255/500)*width}px`);
    lengthSlider.style('left', `${canvas.offsetLeft + (255/500)*width}px`);
    



    reset = createButton("Reset")
    reset.style('position', 'absolute ');
    reset.style('top', `${height -360}px`);
    reset.style('left', `${canvas.offsetLeft+72}px`);   

    reset.mousePressed(restart);
    reset.style('border-radius',6)
    reset.style('background-color','#0060df')
    reset.style('color','#ffffff')
    reset.style('padding','7px 16px')
    reset.style('font-size', '16px')
    reset.style('font-family',"Hussar Bold")
    
    pressed = false
    k = 0;
    displacement = 0;

    textFont(myFont);        
    
    textAlign(LEFT);
    
    // text('Starting Position', thetaSlider.x * 2 + thetaSlider.width, 95);
    // text('Drag', dragSlider.x * 2 + dragSlider.width, 65);
    
    myChart = createChart(RK[0],RK[1]);
    


}
function resizeDiv() {
  // const ratio = window.innerWidth / 500;
  div.style.width = windowWidth
  div.style.height = div.style.width;
  currCamera.setPosition(0, 0, 50);
}
function windowResized() {
  // if screensize less than 900px, then double height and width
  let scaleX,scaleY=1;
  if(windowWidth/windowHeight<1){
    scaleX=2;
    scaleY=1.45
    resizeDiv()

  }
  else{
    scaleX,scaleY=1
  }

  width = windowWidth;
  height = scaleY*document.querySelector('.fixed-width-div').offsetHeight;

  
  velocitySlider.style('top', `${canvas.offsetTop +(445/500)*height}px`);
  lengthSlider.style('top', `${canvas.offsetTop+(390/500)*height}px`);
  thetaSlider.style('top', `${canvas.offsetTop+(390/500)*height}px`);
  dragSlider.style('top', `${canvas.offsetTop +(445/500)*height}px`);
  velocitySlider.style('left', `${canvas.offsetLeft + (255/500)*width}px`);
  lengthSlider.style('left', `${canvas.offsetLeft + (255/500)*width}px`);

  dragSlider.style('left', `${canvas.offsetLeft + (72/500)*width}px`);
  thetaSlider.style('left', `${canvas.offsetLeft + (72/500)*width}px`);
  if(windowWidth/windowHeight>1){
    width = 500;
    height = 500;
  }
  height = width
  resizeCanvas(width, width);
  currCamera.setPosition(0, 0, 50);
}
function restart(){
  frame = 0
}


function updateSim(){   
    RK = RK4(thetaSlider.value(),velocitySlider.value(),time,stepSize,A,B(0,dragSlider.value()),C,D,zerothOrderParam(lengthSlider.value()),firstOrderParam);
    // const work = async () => {
    //   await sleep(1000)
    //   //code
    //   }
    // // sleep(1000);
    // work;
    RKx = RK[0].slice();
    RKy=RK[1].slice();
    pendulum_length=lengthSlider.value()
    // console.log(RK)
    frame = 0
    myChart.destroy()
    myChart= createChart(RKx,RKy);
}


function draw() {
  
    if(frame<RKx.length){
        strokeWeight(.2); 
        stroke(255)
        fill(255,255,0)
        background('#191a1a');
        rectMode(CENTER);
        translate(0,-15,0)
        sphere(1)
        stroke(255,0,0)
        

        rotateZ(-RKx[frame])
        
        translate(0,pendulum_length/2,0)
        // This box is the pendulum arm
        
        box(.5,pendulum_length,.5);

        
        strokeWeight(.1); 


        stroke('#0060df');
        
        fill(0,255,255)
        // rotateX(angle*.01);
        // rotateY(angle*.01+3);
            
        // translate(10*Math.sin(RKx[frame]),10*Math.cos(RKx[frame])+12,0);
        translate(0,pendulum_length/2,0)
        sphere(2)


        // fill(255)
        
 
    }
    else{
        frame = 0;
    }
    frame++;

    thetaSlider.changed(updateSim);
    velocitySlider.changed(updateSim);
    dragSlider.changed(updateSim);
    lengthSlider.changed(updateSim);






     
    
    
  
    point(1, 0, 0);
    if(windowWidth>900){
      resizeCanvas(500, 500)

    }
    currCamera.setPosition(0, 0, 50);

    
    textSize(1.5);
    fill(255)
    text("Initial Velocity: " + velocitySlider.value() + "m/s", 1,  22);
    text("Starting Angle: " + Math.round((thetaSlider.value()* 360/3.1415)/2) + "°", -20,  16);
    text( "Drag: " + dragSlider.value(), -20,  22);
    text("Pendulum Length: " + lengthSlider.value() + "m", 1,  16);
    text("Drag-Length Ratio: " + Math.round(10*(dragSlider.value()/(9.8/lengthSlider.value())))/10, 1,  - 21);
    
    
}


// Ideal pivot point is at 10


