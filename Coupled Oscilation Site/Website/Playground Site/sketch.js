let rectangles = [];
let found;
construction = true;
let selection;
links = []
linksClass = []

function setup() {
  playgroundCanvas = createCanvas(800, 400);
  playgroundCanvas.parent('playground-canvas-container');
}
function draw() {
  background(255);
    fill(0);
    textSize(20);
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
    fill(0)
    textAlign(LEFT, CENTER);
    selectionString = 'Selection: ' + selection
    text(selectionString, 20, 50);

  for (let i = 0; i < rectangles.length; i++) {
    fill(255)
    rectangles[i].draw()
    // in the center of the rectangle, draw the index
    fill(255,0,0);
    textAlign(CENTER, CENTER);
    text(i,rectangles[i].x + rectangles[i].width / 2, rectangles[i].y + rectangles[i].height / 2);
    fill(255)
  }
  for(let i = 0; i < linksClass.length; i++){
        linksClass[i].draw()
        // linksClass[i].move(linksClass[i].current_start,linksClass[i].current_end)
//       put the startpoint y val halfway up the smaller boxr
    }    
}



