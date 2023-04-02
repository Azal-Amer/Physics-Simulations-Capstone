function updateObjectIdentities(){
  for(let i = 0; i<rectangles.length; i++){
    rectangles[i].n = i
  }
}
function mousePressed() {
    found = false;
    pings = 0;
    for (let i = 0; i <rectangles.length; i++) {
      if (mouseX >= rectangles[i].x && mouseX <= rectangles[i].x + rectangles[i].width &&
          mouseY >= rectangles[i].y && mouseY <= rectangles[i].y + rectangles[i].height) {
        found = true;
  //       if I wanted to add selection behavior, here's where
        if(construction){
          
          let offsetX = mouseX - rectangles[i].x;
          let offsetY = mouseY - rectangles[i].y;
          // rectangles.splice(i, 1);
          // rectangles.push(currentRectangle);

          mouseDragged = function() {
          rectangles[i].x = mouseX - offsetX;
          rectangles[i].y = mouseY - offsetY;
          
        }
  
        }
        else{
          
          if(!isNaN(selection)){
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

                linksClass.push(new Links(rectangles[i],rectangles[selection],2,1,5));

                selection = NaN;
              }

              else{
                informationOnPingedRow = includesButBetter([i,selection])
                if(informationOnPingedRow[0]){
                  links.splice(informationOnPingedRow[1],1)
                  linksClass.splice(informationOnPingedRow[1],1)
                  linkToLatex(links,rectangles.length)
                  selection = NaN;
                }
  //               if the first row is the one where we got pinged, delete the connection
                else{
                  informationOnPingedRow = includesButBetter([selection,i])
                  links.splice(informationOnPingedRow[1],1)
                  linksClass.splice(informationOnPingedRow[1],1)
                  linkToLatex(links,rectangles.length)
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
        break;
      }
    }
  //   if you've gone through everything and none have been selected, nothing has been clicked
    if(pings==0){
      selection = NaN
      // console.log('nothing clicked')
    }
    if (!found && construction) {
      
      startPoint = createVector(mouseX, mouseY);

      // if the endpoint isnt within an existing rectangle, create a new one
      mouseDragged = function() {
        redraw();
        rect(startPoint.x, startPoint.y, mouseX - startPoint.x, mouseY - startPoint.y);
      }
    }
  }
  
  function mouseReleased() {
    let endFound= false
    for (let i = 0; i <rectangles.length; i++) {
    if (mouseX >= rectangles[i].x && mouseX <= rectangles[i].x + rectangles[i].width &&
      mouseY >= rectangles[i].y && mouseY <= rectangles[i].y + rectangles[i].height) {
        endFound = true;
        break;
      }
      else{
        endFound = false;
      }
    }
    if (startPoint !== null && !found && construction && endFound==false) {
      // calculate the area of the 
      length = mouseX - startPoint.x
      height = mouseY - startPoint.y
      if(length*height>500){
        box = new Box(startPoint.x,startPoint.y,rectangles.length,mouseX - startPoint.x,mouseY - startPoint.y)
      rectangles.push(box);
      linkToLatex(links,rectangles.length)
      updateObjectIdentities()
      
      }
      
    }
    mouseDragged = null;
  }
  
  function redraw() {
    background(255);
    if(construction){
    for (let i = 0; i < rectangles.length; i++) {
      rect(rectangles[i].x, rectangles[i].y, rectangles[i].w, rectangles[i].h);
    }}
  }
  
  function keyPressed() {
    if (key === 'r' || key === 'R') {
      rectangles = [];
      links = [];
      linksClass = [];
      background(255);
      linkToLatex(links,rectangles.length)
      construction = true
      
    }
    if (key === 'c' || key === 'C') {
      construction = !construction; // toggle the boolean value
      selection = NaN
    
  }
    if(key == 'p'){
      console.log(links)
    }
    
    if((key =='d' ||key == 'D') && !isNaN(selection)){
      deleteNode(selection)
      selection = NaN

      // rectangles.splice(selection,1)
  //     we need to go into the links of each box, and through all the links list, and delete anything with this box in it
      
    }
  }
  