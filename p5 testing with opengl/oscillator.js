function createChart(xValues, yValues) {
    console.log(xValues.length)

    RK1 = Smoother([yValues.slice(),xValues.slice()]);
    yValues=RK1[0]
    xValues=RK1[1]
    rounded = xValues.map(Math.round)
    degreesArray = yValues.map(val => val*57.2957805);
  
    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("myChart").getContext("2d");
  
    // Create a new chart using the chart.js library
    Chart.defaults.color = "#8c8c8c";
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: rounded,
        datasets: [{
          label: 'Displacement Graph  ',
          data: degreesArray,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: '#1566e4',
          borderWidth: 1,
          hoverOffset: 4,
          pointRadius: 5,
            pointHoverRadius: 10,
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
      events:['click'],
      onClick: function(event, activeElements) {
        if (activeElements.length > 0) {
            elementIndex = activeElements[0].element.$context.dataIndex
            var clickedDatasetIndex = activeElements[0]._datasetIndex;
            var clickedElementindex = activeElements[0]._index;
            frameValue = xValues[elementIndex]*24
            frame = Math.round(frameValue)
            console.log(frame)
            // console.log(xValues[elementIndex]*240,yValues[elementIndex])
            // var value = chart.data.datasets[clickedDatasetIndex].data[clickedElementindex];
            // console.log( clickedElementindex);
        }
    },

      maintainAspectRatio: false
      
  
    },
    
    });
    return myChart
  }
  
  // const algor = require('./simulating/Approximating Algorithms.js');
  function preloads1(sketchy){
      myFont= sketchy.loadFont('/Assets/HussarBold.otf');
      
  }
  
  function setups1(sketchy) {
    function moewklhjlsad() {
      
  
    
    // width = document.querySelector('.fixed-width-div').offsetLeft;
    width = 500;
    height = width;
    console.log(width)
    
    //  = div.style.width
  
  
    var myCanvas = sketchy.createCanvas(width, width,sketchy.WEBGL);
    myCanvas.parent('canvas-container');
    // myCanvas.position(200,100);
    angle = 0;
    time = 10;
    pendulum_length = 10
  
    stepSize = .001;
    RK = RK4(angle,v_0,time,stepSize,A,B,C,D,zerothOrderParam(pendulum_length),firstOrderParam);
    RKx = RK[0];
      
      // width = width*scaleX
      // height = width*scaleY
      
      
      
      framerate = RKx.length*10/time;
      // frameRate(framerate);
      frame = 0
      
  
      sketchy.dragSlider = sketchy.createSlider(0, 5, 0,.1);
      sketchy.dragSlider.style('position', 'absolute  ');
      sketchy.dragSlider.style('top', `${sketchy.canvas.offsetTop +(445/500)*height}px`);
      
  
      
      sketchy.thetaSlider = sketchy.createSlider(-Math.PI/2,Math.PI/2,0,.01)
      sketchy.thetaSlider.style('position', 'absolute');
      sketchy.thetaSlider.style('top', `${sketchy.canvas.offsetTop+(390/500)*height}px`);
  
      
  
      
      sketchy.velocitySlider = sketchy.createSlider(0,10,0,.1)
      sketchy.velocitySlider.style('position', 'absolute  ');
      sketchy.velocitySlider.style('top', `${sketchy.canvas.offsetTop +(445/500)*height}px`);
  
      
      
      
  
  
      sketchy.lengthSlider = sketchy.createSlider(.1,25,pendulum_length,.1)
      sketchy.lengthSlider.style('position', 'absolute  ');
      sketchy.lengthSlider.style('top', `${sketchy.canvas.offsetTop+(390/500)*height}px`);
  
    
  
      
  
  
  
      sketchy.reset = sketchy.createButton("Reset")
      sketchy.reset.style('position', 'absolute ');
      sketchy.reset.style('top', `${height -360}px`);
      sketchy.reset.style('left', `${sketchy.canvas.offsetLeft+72}px`);  
      
  
      sketchy.reset.mousePressed(restart);
      sketchy.reset.style('border-radius',6)
      sketchy.reset.style('background-color','#0060df')
      sketchy.reset.style('color','#ffffff')
      sketchy.reset.style('padding','7px 16px')
      sketchy.reset.style('font-size', '16px')
      sketchy.reset.style('font-family',"Hussar Bold")
      sketchy.velocitySlider.style('top', `${sketchy.canvas.offsetTop +(445/500)*height}px`);
    sketchy.lengthSlider.style('top', `${sketchy.canvas.offsetTop+(390/500)*height}px`);
    sketchy.thetaSlider.style('top', `${sketchy.canvas.offsetTop+(390/500)*height}px`);
    sketchy.dragSlider.style('top', `${sketchy.canvas.offsetTop +(445/500)*height}px`);
    sketchy.velocitySlider.style('left', `${sketchy.canvas.offsetLeft + (255/500)*width}px`);
    sketchy.lengthSlider.style('left', `${sketchy.canvas.offsetLeft + (255/500)*width}px`);
    sketchy.dragSlider.style('left', `${sketchy.canvas.offsetLeft + (80/500)*width}px`);
    sketchy.thetaSlider.style('left', `${sketchy.canvas.offsetLeft + (72/500)*width}px`);
      
      pressed = false
      k = 0;
      displacement = 0;
  
      sketchy.textFont(myFont);        
      
      sketchy.textAlign(sketchy.LEFT);
      
      sketchy.text('Starting Position', sketchy.thetaSlider.x * 2 + sketchy.thetaSlider.width, 95);
      sketchy.text('Drag', sketchy.dragSlider.x * 2 + sketchy.dragSlider.width, 65);
      
      myChart = createChart(RK[0],RK[1]);
      
        

      sketchy.currCamera = sketchy.createCamera();
      windowResized(sketchy) 
    }
    return moewklhjlsad
  
  
  }
  
  function windowResized(sketchy,width) {
    height = width
    // if screensize less than 900px, then double height and width
  
    // width = document.querySelector('.fixed-width-div').offsetLeft;
    // height = width;
    // height = document.querySelector('.fixed-width-div').offsetHeight;
    console.log(width,height)
    
    sketchy.velocitySlider.style('top', `${sketchy.canvas.offsetTop +(445/500)*height}px`);
    sketchy.lengthSlider.style('top', `${sketchy.canvas.offsetTop+(390/500)*height}px`);
    sketchy.thetaSlider.style('top', `${sketchy.canvas.offsetTop+(390/500)*height}px`);
    sketchy.dragSlider.style('top', `${sketchy.canvas.offsetTop +(445/500)*height}px`);
    sketchy.velocitySlider.style('left', `${sketchy.canvas.offsetLeft + (255/500)*width}px`);
    sketchy.lengthSlider.style('left', `${sketchy.canvas.offsetLeft + (255/500)*width}px`);
    sketchy.dragSlider.style('left', `${sketchy.canvas.offsetLeft + (80/500)*width}px`);
    sketchy.thetaSlider.style('left', `${sketchy.canvas.offsetLeft + (72/500)*width}px`);
  
    sketchy.currCamera.setPosition(0, 0, 50);
  }
  
  function restart(){
    frame = 0
    heat = 0;
  }
  
  
  function updateSim(sketchy){
    function meowmeowwoof(){
      RK = RK4(sketchy.thetaSlider.value(),sketchy.velocitySlider.value(),time,stepSize,A,B(0,sketchy.dragSlider.value()),C,D,zerothOrderParam(sketchy.lengthSlider.value()),firstOrderParam);
      // const work = async () => {
      //   await sleep(1000)
      //   //code
      //   }
      // // sleep(1000);
      // work;
      drag = sketchy.dragSlider.value()
      t_0 = sketchy.thetaSlider.value()
      RKx = RK[0].slice();
      RKy=RK[1].slice();
      pendulum_length=sketchy.lengthSlider.value()
      // console.log(RK)
      frame = 0
      myChart.destroy()
      myChart= createChart(RKx,RKy);
  
    }   
    return meowmeowwoof
      
  }
  
  
  function drawy(sketchy) {
    
    function meowkms(){
        if(frame<RKx.length){
          sketchy.strokeWeight(.2); 
          sketchy.stroke(255)
          sketchy.fill(255,255,0)
          sketchy.background('#191a1a');
          sketchy.rectMode(sketchy.CENTER);
          sketchy.translate(0,-15,0)
          sketchy.sphere(1)
          sketchy.stroke(255,0,0)
            
  
          sketchy.rotateZ(-RKx[frame])
            
          sketchy.translate(0,pendulum_length/2,0)
            // This box is the pendulum arm
            
            sketchy.box(.5,pendulum_length,.5);
  
            
            sketchy.strokeWeight(.1); 
  
  
            sketchy.stroke('#0060df');
            
            sketchy.fill(0,255,255)
            // rotateX(angle*.01);
            // rotateY(angle*.01+3);
                
            // translate(10*Math.sin(RKx[frame]),10*Math.cos(RKx[frame])+12,0);
            sketchy.translate(0,pendulum_length/2,0)
            sketchy.sphere(2)
  
  
            // fill(255)
            
    
        }
        else{
            frame = 0;
        }
        frame++;
  
        sketchy.thetaSlider.changed(updateSim(sketchy));
        sketchy.velocitySlider.changed(updateSim(sketchy));
        sketchy.dragSlider.changed(updateSim(sketchy));
        sketchy.lengthSlider.changed(updateSim(sketchy));
  
  
  

      
        sketchy.point(1, 0, 0);
      
        sketchy.currCamera.setPosition(0, 0, 50);
  
        
        sketchy.textSize(1.5);
        sketchy.fill(255)
        sketchy.text("Initial Velocity: " + sketchy.velocitySlider.value() + "m/s", 1,  22);
        sketchy.text("Starting Angle: " + Math.round((sketchy.thetaSlider.value()* 360/3.1415)/2) + "°", -20,  16);
        sketchy.text( "Drag: " + sketchy.dragSlider.value(), -20,  22);
        sketchy.text("Pendulum Length: " + sketchy.lengthSlider.value() + "m", 1,  16);
        sketchy.text("Drag-Length Ratio: " + Math.round(10*(sketchy.dragSlider.value()/(9.8/sketchy.lengthSlider.value())))/10, 1,  - 21);



        
    }
    return meowkms
  }