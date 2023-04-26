
function updateObjectIdentities(){
  for(let i = 0; i<rectangles.length; i++){
    rectangles[i].n = i
  }
}

function mousePressed() {
    found = false;
    pings = 0;
    for (let i = 0; i <rectangles.length; i++) {
      xPosState1 = (rectangles[i].x<=mouseX) && (mouseX<=(rectangles[i].x+rectangles[i].width))
      xPosState2 = ((rectangles[i].x+rectangles[i].width)<=mouseX) && (mouseX<rectangles[i].x)
      yPosState1 = (rectangles[i].y<=mouseY) && mouseY<=((rectangles[i].y+rectangles[i].height))
      yPosState2 = ((rectangles[i].y+rectangles[i].height)<=mouseY) && (mouseY<=rectangles[i].y)

      experimentalBoolean = (xPosState1&&(yPosState1||yPosState2))||(xPosState2&&(yPosState1||yPosState2))

      if (experimentalBoolean){
        found = true;
  //       if I wanted to add selection behavior, here's where
        if(construction){
          selection = i
          
          let offsetX = mouseX - rectangles[i].x;
          let offsetY = mouseY - rectangles[i].y;
          // rectangles.splice(i, 1);
          // rectangles.push(currentRectangle);

          mouseDragged = function() {
          rectangles[i].x_i = mouseX - offsetX;
          rectangles[i].move(0);
          rectangles[i].y = mouseY - offsetY;
          
        }
  
        }
        else if (linking){
          if(!isNaN(selection) && playground==true){
            hasLink = includesButBetter([i,selection])[0] || includesButBetter([selection,i])[0]
            
            // console.log('hasRow?',hasLink)
            if(selection!=i && !isNaN(selection)){
              if(!hasLink){
    //             We need to check if we already have the link stored
    
                rectangles[i].links.push(selection)
                if(rectangles[i].x<rectangles[selection].x){
                  links.push([i,selection]);
                  linkToLatex(links,rectangles.length)

                }
                else{
                  links.push([selection,i]);
                  linkToLatex(links,rectangles.length)
                }

                linksClass.push(new Links(rectangles[i],rectangles[selection],20,.6,5));


                selection = NaN;
                sliderDiv.style.display = "none";
              }

              else{
                informationOnPingedRow = includesButBetter([i,selection])
                if(informationOnPingedRow[0]){
                  links.splice(informationOnPingedRow[1],1)
                  linksClass.splice(informationOnPingedRow[1],1)
                  linkToLatex(links,rectangles.length)
                  sliderDiv.style.display = "none";
                  selection = NaN;
                  
                }
  //               if the first row is the one where we got pinged, delete the connection
                else{
                  informationOnPingedRow = includesButBetter([selection,i])
                  links.splice(informationOnPingedRow[1],1)
                  linksClass.splice(informationOnPingedRow[1],1)
                  linkToLatex(links,rectangles.length)
                  sliderDiv.style.display = "none";
                  selection = NaN;
                }
  //               if the link is already there, delete it
              }
            }          
          }
          else{
            selection = i
          }
          pings++;
        }
        else if (properties){
          
          selection = i
          sliderDiv.style.display = "flex";
          console.log('properties', selection)
          updateSliders(selection)
          pings++;
        }
        else{
          console.log('playground', selection)
          selection = i
          updateSliders(selection)
          sliderDiv.style.display = "flex";
          pings++;
        }
        
        break;
      }

    }
  //   if you've gone through everything and none have been selected, nothing has been clicked
    if(pings==0 && playground==true && linking==true && mouseX>0){
      selection = NaN
      sliderDiv.style.display = "none";

      // console.log('nothing clicked')
    }
    if (!found && construction) {
      
      startPoint = createVector(mouseX, mouseY);

      // if the endpoint isnt within an existing rectangle, create a new one
      mouseDragged = function() {
        // redraw();
        
        fill(255,255,255,255)
        rect(startPoint.x, startPoint.y, mouseX - startPoint.x, mouseY - startPoint.y);
      }
    }

}

function mouseReleased() {
  let endFound= false
  for (let i = 0; i <rectangles.length; i++) {
    xPosState1 = (rectangles[i].x<=mouseX) && (mouseX<=(rectangles[i].x+rectangles[i].width))
      xPosState2 = ((rectangles[i].x+rectangles[i].width)<=mouseX) && (mouseX<rectangles[i].x)
      yPosState1 = (rectangles[i].y<=mouseY) && mouseY<=((rectangles[i].y+rectangles[i].height))
      yPosState2 = ((rectangles[i].y+rectangles[i].height)<=mouseY) && (mouseY<=rectangles[i].y)

      experimentalBoolean = (xPosState1&&(yPosState1||yPosState2))||(xPosState2&&(yPosState1||yPosState2))

    if (experimentalBoolean) {
        endFound = true;
        break;
    }
    else{
      endFound = false;
    }
  }
  if (startPoint !== null && !found && construction && endFound==false) {
    // calculate the area of the 
    length = abs(mouseX - startPoint.x)
    height = abs(mouseY - startPoint.y)
    if(abs(length*height)>250){
      let startX;
      let endX;
      if(mouseX-startPoint.x<0){
        startX = mouseX
        endX = startPoint.x-mouseX
      }
      else{
        startX = startPoint.x
        endX = mouseX - startPoint.x
      }
      let startY;
      let endY;
      
      if(mouseY-startPoint.y<0){
        startY = mouseY
        endY = startPoint.y-mouseY
        console.log('here')
        
      }
      else{
        startY = startPoint.y
        endY = -startPoint.y+mouseY
      }
      box = new Box(startX,startY,rectangles.length,endX,endY)
      rectangles.push(box);
      
    }
      else{
      console.log('rejected constuction cause size')
    }
      
    linkToLatex(links,rectangles.length)
    updateObjectIdentities()
  }
  mouseDragged = null;
}

function redraw() {
  background(255);
  if(construction){
    for (let i = 0; i < rectangles.length; i++) {
      rect(rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h);
    }
  }
}
var sliderDiv = document.getElementById("input-container");
function resetPositions(){
  for(let i = 0; i<oscillator_List.length; i++){
    rectangles[i].move(5*oscillator_List[i].x_i[0])
  }
}

const description = document.querySelector('#description');
const supplementalDesc = document.querySelector('#supplemental-desc');

function simulateTheThing(){
  lastItems = [links,initialConditions,driverParameters]
  
    K = KMatrixConstructor(links,rectangles.length,spring_constants)
    console.log(K)
    // B = KMatrixConstructor(links,rectangles.length,damping)
    // console.log(B)
    // third input is spring constant
    M = []
    for(let i = 0; i<rectangles.length; i++){
      M.push(rectangles[i].mass)
    }
    oscillator_List = Simulator(rectangles.length,false,M,K,-10,damping)
    

}
function constructionMode(){
  springSlider.elt.disabled = false;
  dampeningSlider.elt.disabled = false;
  initialPosition.elt.disabled = false;
  initialVelocity.elt.disabled = false;
  driverFrequency.elt.disabled = false;
  driverAmplitude.elt.disabled = false;
  resetPositions()
  sliderDiv.style.display = "none";
  construction = true; // toggle the boolean value
  linking = false;
  properties = false;
  playground = true
  description.textContent = 'Click and Drag boxes to construct and move them around!';
  supplementalDesc.textContent = '';
}
function resetMode(){
  rectangles = [];
    links = [];
    linksClass = [];
    oscillator_List=[];
    initialConditions = [];
    driverParameters = [];
    selection = NaN
    anchorStates=[]
    springSlider.elt.disabled = false;
    dampeningSlider.elt.disabled = false;
    initialPosition.elt.disabled = false;
    initialVelocity.elt.disabled = false;
    driverFrequency.elt.disabled = false;
    driverAmplitude.elt.disabled = false;
    sliderDiv.style.display = "none";
    springSlider.value(10);
    dampeningSlider.value(0);
    redoSprings();

    background(255);
    linkToLatex(links,rectangles.length)
    construction = true
    playground=true
}
function linkMode(){
  springSlider.elt.disabled = false;
    dampeningSlider.elt.disabled = false;
    initialPosition.elt.disabled = false;
    initialVelocity.elt.disabled = false;
    driverFrequency.elt.disabled = false;
    driverAmplitude.elt.disabled = false;
    resetPositions()
    selection = NaN
    sliderDiv.style.display = "none";

    construction = false;
    linking = true;
    properties = false;
    playground = true
    description.textContent = 'Click two boxes together to add a spring ';
    supplementalDesc.textContent = 'Click them again to remove it. Click away to deselect';
}
function propertiesMode(){
  springSlider.elt.disabled = false;
    dampeningSlider.elt.disabled = false;
    initialPosition.elt.disabled = false;
    initialVelocity.elt.disabled = false;
    driverFrequency.elt.disabled = false;
    driverAmplitude.elt.disabled = false;
    resetPositions()
    properties = true
    construction = false;
    linking = false;
    playground = true
    description.textContent = 'Click on a box to change its properties!';
    supplementalDesc.textContent = 'Each box has 4 unique sliders, move those to change the properties of the box ';
}
function simulate(){
  if(rectangles.length>=2){
    description.textContent = 'Simulating. To edit the system, click back to one of the previous modes';
    supplementalDesc.textContent = '';
    initialPosition.elt.disabled = true;
    initialVelocity.elt.disabled = true;
    driverFrequency.elt.disabled = true;
    driverAmplitude.elt.disabled = true;
    springSlider.elt.disabled = true;
    dampeningSlider.elt.disabled = true;
    sliderDiv.style.display = "flex";
    
    frame = 0
    items = [links,initialConditions,driverParameters]
    playground = false
    linkking = false
    construction = false
    
    if(lastItems !=items && links!=[] ){
      frame = 0
      simulateTheThing()

      }
      
  }
}
function deleteTheDude(){
  springSlider.elt.disabled = false;
    dampeningSlider.elt.disabled = false;
    initialPosition.elt.disabled = false;
    initialVelocity.elt.disabled = false;
    driverFrequency.elt.disabled = false;
    driverAmplitude.elt.disabled = false;
    deleteNode(selection)
    selection = NaN
    sliderDiv.style.display = "none";
    if(playground==false){
      propertiesMode();
    }
}


document.getElementById("button1").addEventListener("click", function() {
  constructionMode();
});

document.getElementById("button2").addEventListener("click", function() {
  linkMode();
});

document.getElementById("button3").addEventListener("click", function() {
  propertiesMode();
});

document.getElementById("button4").addEventListener("click", function() {
 simulate();
});
document.getElementById("resetButton").addEventListener("click", function() {
  resetMode();
 });
document.getElementById("deleteButton").addEventListener("click", function() {
  console.log('delete button',selection)
  if(!isNaN(selection)){
    

    deleteTheDude();
  }
 });
 
function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetMode()
  }
  if (key === 'c' || key === 'C') {
    constructionMode();
  
  }
  if((key === 'l' || key === 'L')){
    linkMode()
  }
  if((key === 'p' || key === 'P')){
    propertiesMode()
  }

  if((key =='d' ||key == 'D') && !isNaN(selection)){
    deleteTheDude()

//     we need to go into the links of each box, and through all the links list, and delete anything with this box in it
    
  }
  if((key == 's' || key == 'S')){
    simulate()
  }

}

