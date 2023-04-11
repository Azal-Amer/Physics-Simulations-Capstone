let rectangles = [];
let found;

construction = true;
linking = false;
properties = true;

let selection;
links = []
linksClass = []
let playground = true;
let K;
let oscillator_List = [];
let frame;

let initialConditions=[];
// 2xN array with initial conditions, [pos,vel]
let driverParameters = [];
// 3xN array with driver parameters, [amp,freq,phase]

let anchorStates =[]

let lastItems = []


let spring_constants = 100;
let damping = 0;

function redoSprings(){
  console.log('redoing')
  spring_constants = springSlider.value()
  damping = dampeningSlider.value()
  for(let i = 0; i<links.length; i++){
    let density = linksClass[i].densityRaw/(.25*(spring_constants+20))
    if(density<=.25){
      density = .25
    }
    linksClass[i].density = density
    linksClass[i].updateWinds()
  }
  springSliderValue.html(`Spring Constant: ${springSlider.value()} N/m`);
  dampingSliderValue.html(`Damping Constant: ${dampeningSlider.value()} N/ms`);
}

function preload() {
  // Load the font file
  myFont = loadFont('Font Assets/HussarBoldWeb.ttf');
}

function setup() {
  textFont(myFont);
  playgroundCanvas = createCanvas(1000, 400);
  generateSliders()

  playgroundCanvas.parent('playground-canvas-container');

  // make two sliders, one for the spring constant, and one for the dampening

  springSlider = createSlider(10, 100, 10);
  springSliderValue = createElement('p',`Spring Constant: ${springSlider.value()} N/m`);

  springSlider.parent('springSlider');


  dampeningSlider = createSlider(0, 5, 0,.1);
  dampeningSlider.parent('dampingSlider');
  dampingSliderValue = createElement('p',`Damping Constant: ${dampeningSlider.value()} N/ms`);
  springSliderValue.parent('springSlider-value')
  dampingSliderValue.parent('dampeningSlider-value')
  springSlider.input(redoSprings);
  dampeningSlider.input(redoSprings);

  frame = 0;
  
}
function drawTextWithBox(textContent, textX, textY,textColor) {
  // Set the text and box colors
  fill('#191a1a');
  noStroke(0);
  // strokeWeight(0);
  textX=textX*5


  let tw = textWidth(textContent) + 10;
  let th = textAscent() + textDescent() +5;
  let bx = textX - tw/2;
  let by = textY - th/2;


  rect(bx, by, tw, th, 10);
  fill(textColor);
  noStroke();
  textAlign(CENTER, CENTER);
  text(textContent, textX, textY);
}


function draw() {
  if(playground == false){
    springSlider.value(spring_constants)
    dampeningSlider.value(damping)
  }
  spring_constants = springSlider.value()
  damping = dampeningSlider.value()
  background('#191a1a');
  fill(0);
  textSize(20);
  stroke(0)
  

  if(playground==false){
    if(oscillator_List.length == rectangles.length){
      for(let i = 0; i<rectangles.length; i++){
        
        
        rectangles[i].move(5*oscillator_List[i].x_i[frame*5])

    }
    frame++;
    if(frame==round(oscillator_List[0].x_i.length/5)){
      frame = 0;
    }
  }
  }
  for(let i = 0; i < linksClass.length; i++){
    if(playground==true){
      linksClass[i].updateWinds()
    }
    linksClass[i].draw()
//       put the startpoint y val halfway up the smaller boxr
    }   

  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].draw()
    // in the center of the rectangle, draw the index

    
    if (i == selection) {
      fill(255, 0, 0)


    }
    else if (anchorStates[i] == true) {
      stroke(0, 0, 0)
      fill('#0060df');
    }
    else {
      stroke('#0060df')
      fill('#00F3F7');
    }
    strokeWeight(7)
    textAlign(CENTER, CENTER);
    text(i,rectangles[i].x + rectangles[i].width / 2, rectangles[i].y + rectangles[i].height / 2);
    // fill(255)
  }
  // Going through each box, and drawing the box's corresponding value

   
    if(playground==true){
      if(construction){

          textAlign(CENTER, CENTER);
          drawTextWithBox('Construction Mode', 25, 30,"#FF0000");
          // text('Contruction Mode', 20, 30);
      }
      else if (linking){
          textAlign(CENTER, CENTER);
          drawTextWithBox('Linkage Mode', 20, 30,"#00FF00");
          // text('Linkage Mode', 20, 30);
      }
      else if(properties){
        textAlign(LEFT, CENTER);
        drawTextWithBox('Properties Mode', 20, 30,'#00ffff');

        // text('Properties Mode', 20, 30);
  
      }
    }
    else{
      textAlign(LEFT, CENTER);
      fill(0)
      drawTextWithBox('Simulation Mode', 20, 30,'#ffffff');
      // text('Simulation Mode', 20, 30);
    }
    fill(255)
    textAlign(LEFT, CENTER);
      
      selectionString = 'Selection: ' + selection
      if(Number.isInteger(selection)){
        drawTextWithBox(selectionString, 20, 60,'#ffffff');
      }

      // text(selectionString, 20, 50);
    
    
}



