function c(t) {
  return spring_constant
}
function createChartSpring(xValues, yValues) {
  // if myChart exists, destroy it

  console.log(xValues.length)

  RK1 = Smoother([yValues.slice(), xValues.slice()]);
  yValues = RK1[0]
  xValues = RK1[1]
  rounded = xValues.map(Math.round)
  // Rounds the time values for aesthetic
  degreesArray = yValues.map(val => val /10);
  // Converts the radians in yValues, to degrees

  // Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  // Parents this to a div

  // Create a new chart using the chart.js library
  Chart.defaults.color = "#8c8c8c";
  var myChartSpring = new Chart(ctx, {
    type: 'line',
    data: {
      labels: rounded,
      datasets: [{
        label: 'Displacement Graph  ',
        data: degreesArray,
        backgroundColor: '#1566e4',
        borderColor: '#ffffff',
        borderWidth: 1,
        hoverOffset: 4,
        pointRadius: 5,
        pointHoverRadius: 10,
      }]
    }
    ,
    options: {
      scales: {
        // Labels axis
        y: {
          title: {
            display: true,
            text: 'Displacement (m)'
          },
          grid: {
            color: '#3c3c3c'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Seconds'
          },
          grid: {
            color: '#3c3c3c'
          }
        },


      },
      events: ['click'],
      onClick: function(event, activeElements) {
        if (activeElements.length > 0) {
          elementIndex = activeElements[0].element.$context.dataIndex
          var clickedDatasetIndex = activeElements[0]._datasetIndex;
          var clickedElementindex = activeElements[0]._index;
          frameValue = xValues[elementIndex] * 24
          frame = Math.round(frameValue)
          console.log(frame)
          // THIS PART HANDLES THE CLICK INTERACTIVENESS
        }
      },

      maintainAspectRatio: false


    },

  });
  return myChartSpring
}
function updateSimSpring(sketchy) {
  // same reason as setups for weird function return logic
  function meowmeowwoof() {
    spring_constant = sketchy.lengthSlider.value()
    amplitude = sketchy.amplitudeSlider.value()
    frequency = sketchy.freqSlider.value()
    spring_constant= sketchy.lengthSlider.value()
    RK = RK4(sketchy.thetaSlider.value(), sketchy.velocitySlider.value(), time, stepSize, A, B(0, sketchy.dragSlider.value()), c, D(amplitude, frequency), springdude(sketchy.lengthSlider.value()), firstOrderParam);
    let paragraph = document.getElementById('equation')
    if(amplitude ==0|| frequency ==0){
      queryAndPush(1, sketchy.dragSlider.value(), spring_constant, "0",sketchy.thetaSlider.value()/10,sketchy.velocitySlider.value(),'equation')
    }
    else{
      paragraph.innerHTML = 'Equation: null '
      subscript.innerHTML = 'No Closed Form Solution'
    }
    

    
    energy = energyCalculator(RK[0], RK[2], isSpring);
    drag = sketchy.dragSlider.value()


    t_0 = sketchy.thetaSlider.value()
    RKx = RK[0].slice();
    RKy = RK[1].slice();
    spring_constant = sketchy.lengthSlider.value()
    // console.log(RK)
    frame = 0
    myChartSpring.destroy()
    myChartSpring = createChartSpring(RKx, RKy);
    spring = new Spring(length = 100, numLines = 4*(sketchy.lengthSlider.value())+3,x_i=0,y_i=150 ,thickness = 1, springHeight = 20);


  }
  sendSliderValues(sketchy)
  return meowmeowwoof

}

function springdude(spring_constant){
  function meow(t){
    return t
  }
  
  return meow
  
}

function setupSpring(sketchy) {
  
  loop = true
  // To make this function correctly an attribute of the p5 canvas, I have to give it a function as a parameter,
  // so to be lazy, I just dropped everything in this nonsense function, and returned it. 
  function moewklhjlsad() {



    // width = document.querySelector('.fixed-width-div').offsetLeft;
    width = 500;
    height = width;

    //  = div.style.width


    var myCanvas = sketchy.createCanvas(width, width);
    myCanvas.parent('canvas-container');
    // myCanvas.position(200,100);
    distance = 0;
    time = 30;
    spring_constant = 10

    stepSize = .001;
    amplitude = 0
    frequency = 0
    
    
    RK = RK4(distance, v_0, time, stepSize, A, B, c, D(amplitude, frequency), springdude(spring_constant), firstOrderParam);
    let paragraph = document.getElementById('equation')
    paragraph.innerHTML = 'Equation: `x(t)=0`'
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'equation']);
    let subscript = document.getElementById('subscript')
    subscript.innerHTML=''

    energy = energyCalculator(RK[0], RK[2], isSpring);
    RKx = RK[0];

    // width = width*scaleX
    // height = width*scaleY



    framerate = RKx.length * 10 / time;
    // frameRate(framerate);
    frame = 0


    sketchy.dragSlider = sketchy.createSlider(0, 5, 0, .1);
    sketchy.dragSlider.style('position', 'absolute  ');



    sketchy.thetaSlider = sketchy.createSlider(0, 100, 0, 1)
    sketchy.thetaSlider.style('position', 'absolute');




    sketchy.velocitySlider = sketchy.createSlider(0, 100, 0, 1)
    sketchy.velocitySlider.style('position', 'absolute  ');






    sketchy.lengthSlider = sketchy.createSlider(.1, 10.1, spring_constant, .5)
    sketchy.lengthSlider.style('position', 'absolute  ');
    // This correspongs to the spring constant

    sketchy.amplitudeSlider = sketchy.createSlider(-5, 5, amplitude, .5)
    sketchy.amplitudeSlider.style('position', 'absolute  ');
    sketchy.freqSlider = sketchy.createSlider(0, 10, 0, .25)
    sketchy.freqSlider.style('position', 'absolute  ');
    sketchy.freqSlider.id('freqSlider');





    // sketchy.velocitySlider.style('left', `${sketchy.canvas.offsetLeft + (255/500)*width}px`);
    // sketchy.velocitySlider.style('top', `${sketchy.canvas.offsetTop +(445/500)*height}px`);







    sketchy.reset = sketchy.createButton("Reset")
    sketchy.reset.style('position', 'relative ');
    sketchy.reset.style('top', `${-height+15}px`);
    sketchy.reset.style('left', `${sketchy.canvas.offsetLeft + 72}px`);
    sketchy.pause = sketchy.createButton("⏯")
    sketchy.pause.style('position', 'relative ');

    sketchy.pause.style('top', `${-height+20}px`);
    sketchy.pause.style('left', `${sketchy.canvas.offsetLeft + 85}px`);

    sketchy.reset.mousePressed(restart);
    sketchy.reset.style('border-radius', 6)
    sketchy.reset.style('background-color', '#0060df')
    sketchy.reset.style('color', '#ffffff')
    sketchy.reset.style('padding', '7px 16px')
    sketchy.reset.style('font-size', '16px')
    sketchy.reset.style('font-family', "Hussar Bold")

    sketchy.pause.mousePressed(pause);
    sketchy.pause.style('border-radius', 6)
    sketchy.pause.style('background-color', '#0060df')
    sketchy.pause.style('color', '#ffffff')
    sketchy.pause.style('padding', '3px 10px')
    sketchy.pause.style('font-size', '30px')
    sketchy.pause.style('font-family', "Hussar Bold")


    sketchy.velocitySlider.style('left', `${sketchy.canvas.offsetLeft + ((255) / 500) * width}px`);
    sketchy.velocitySlider.style('top', `${sketchy.canvas.offsetTop + (((445 - offsetSlider)) / 500) * height}px`);

    sketchy.lengthSlider.style('top', `${sketchy.canvas.offsetTop + ((390 - offsetSlider) / 500) * height}px`);
    sketchy.lengthSlider.style('left', `${sketchy.canvas.offsetLeft + ((255) / 500) * width}px`);



    sketchy.thetaSlider.style('top', `${sketchy.canvas.offsetTop + ((390 - offsetSlider) / 500) * height}px`);
    sketchy.thetaSlider.style('left', `${sketchy.canvas.offsetLeft + (80 / 500) * width}px`);


    sketchy.dragSlider.style('top', `${sketchy.canvas.offsetTop + ((445 - offsetSlider) / 500) * height}px`);
    sketchy.dragSlider.style('left', `${sketchy.canvas.offsetLeft + (80 / 500) * width}px`);

    sketchy.amplitudeSlider.style('top', `${sketchy.canvas.offsetTop + ((500 - offsetSlider) / 500) * height}px`);
    sketchy.amplitudeSlider.style('left', `${sketchy.canvas.offsetLeft + (80 / 500) * width}px`);

    sketchy.freqSlider.style('top', `${sketchy.canvas.offsetTop + ((500 - offsetSlider) / 500) * height}px`);
    sketchy.freqSlider.style('left', `${sketchy.canvas.offsetLeft + (255 / 500) * width}px`);



    pressed = false
    k = 0;
    displacement = 0;

    sketchy.textFont(myFont);

    sketchy.textAlign(sketchy.LEFT);

    sketchy.text('Starting Position', sketchy.thetaSlider.x * 2 + sketchy.thetaSlider.width, 95);
    sketchy.text('Drag', sketchy.dragSlider.x * 2 + sketchy.dragSlider.width, 65);

    myChartSpring = createChartSpring(RK[0], RK[1]);



    windowResized(sketchy)
    spring = new Spring(length = 100, numLines = 10*(sketchy.lengthSlider.value())+30,x_i=0,y_i=150 ,thickness = 1, springHeight = 20);
  }
  return moewklhjlsad


}
function springDrawy(sketchy){
  
  function meowkms() {
    sketchy.fill(255, 255, 0)
    sketchy.background('#191a1a');
    
    if (loop == true) {
      if (!(frame < RKx.length)) {
        console.log('framekill')
        frame = 0;
        spring = new Spring(length = 100, numLines = 10*(sketchy.lengthSlider.value())+30,x_i=0,y_i=150 ,thickness = 1, springHeight = 20);
      }

      frame++;
    }

    sketchy.translate(100,100)
    sketchy.stroke(255,255,0)
    spring.draw(sketchy);
        
    sketchy.strokeWeight(3)
    sketchy.stroke('#0060df');
    sketchy.fill(0, 255, 255)
    sketchy.rect(spring.current_end.x,spring.current_end.y-37,75,75)
    spring.move(RK[0][frame]+100)
    sketchy.thetaSlider.changed(updateSimSpring(sketchy));
    sketchy.velocitySlider.changed(updateSimSpring(sketchy));
    sketchy.dragSlider.changed(updateSimSpring(sketchy));
    sketchy.lengthSlider.changed(updateSimSpring(sketchy));
    sketchy.amplitudeSlider.changed(updateSimSpring(sketchy));
    sketchy.freqSlider.changed(updateSimSpring(sketchy));
    // checks for interactions with the slider to update the sim







    sketchy.stroke(0,0,0,0)
    sketchy.textSize(14);
    sketchy.fill(255)
    sketchy.text("Spring Constant: " + Math.round(sketchy.lengthSlider.value()) + "N/m", 155, 250);

    sketchy.text("Initial Velocity: " + sketchy.velocitySlider.value()/10 + "m/s",155, 310);
    sketchy.text("Displacement: " + Math.round(sketchy.thetaSlider.value())/10 + "m", -15, 250)
    sketchy.text("Drag: " + sketchy.dragSlider.value(), -15, 310);
    sketchy.text("Driver Amplitude: " + sketchy.amplitudeSlider.value() + "N", -15, 370);
    sketchy.text("Driver Frequency: " + sketchy.freqSlider.value(), 155, 370);


    // sketchy.text("Drag-Length Ratio: " + Math.round(10 * (sketchy.dragSlider.value() / (9.8 / sketchy.lengthSlider.value()))) / 10, 1, -21);
  }

  return meowkms
}
