let rectangles = [];
let found;
construction = true;
let selection;
links = []
linksClass = []
let playground = true;
let K;
let oscilator_List = [];
let frame;

let spring_constants = 20;
function setup() {
  playgroundCanvas = createCanvas(800, 400);
  playgroundCanvas.parent('playground-canvas-container');
  frame = 0;
}
function draw() {
  background(255);
  fill(0);
  textSize(20);
  if(playground==true){
    if(construction){
        fill(0,0,255)
        textAlign(LEFT, CENTER);
        text('Contruction Mode', 20, 30);
    }
    else{
        fill(255,0,0)
        textAlign(LEFT, CENTER);
        text('Linkage Mode', 20, 30);
    }
  }
  else{
    textAlign(LEFT, CENTER);
    text('Simulation Mode', 20, 30);
  }
  fill(0)
  textAlign(LEFT, CENTER);
  selectionString = 'Selection: ' + selection
  text(selectionString, 20, 50);
  if(playground==false){
    if(oscilator_List.length == rectangles.length){
      for(let i = 0; i<rectangles.length; i++){
        
        
        rectangles[i].move(5*oscillator_List[i].x_i[frame*5])

    }
    frame++;
    if(frame==round(oscillator_List[0].x_i.length/5)){
      frame = 0;
    }
  }
  }

  for (let i = 0; i < rectangles.length; i++) {
    fill(255)
    rectangles[i].draw()
    // in the center of the rectangle, draw the index
    fill(255,0,0);
    textAlign(CENTER, CENTER);
    text(i,rectangles[i].x + rectangles[i].width / 2, rectangles[i].y + rectangles[i].height / 2);
    fill(255)
  }
  // Going through each box, and drawing the box's corresponding value

  for(let i = 0; i < linksClass.length; i++){
    if(playground==true){
      linksClass[i].updateWinds()
    }
    linksClass[i].draw()
//       put the startpoint y val halfway up the smaller boxr
    }    
}



