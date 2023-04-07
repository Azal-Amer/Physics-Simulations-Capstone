class Links{
    checkPosition(box1,box2){
        let startBox;
        let endBox;
        let topBox;
        let bottomBox;
        let startX;
        let endX;
        let topBoxsBottom;
        let bottomBoxsTop;
        let aimedHeight;

        // X VALUES CALCULATION
        if(box1.x>box2.x){
            startBox = box2
            endBox = box1
        }
        else{
            startBox = box1
            endBox = box2
        }
        // We're checking which of the two boxes is further to the right
        // We want to draw the line from the right side of the left box to the left side of the right box
        //  startX;
        // let endX;
        if(endBox.width>0){
          endX = endBox.x
        }
        else{
          endX = endBox.x+endBox.width
        }
        
        if(startBox.width<0){
          startX = startBox.x
        }
        else{
          startX = startBox.x+startBox.width
        }
        


        // Y VALUES CALCULATION
      
      

        if(box1.y>box2.y){
            topBox = structuredClone(box2)
            bottomBox = structuredClone(box1)
        }
        else{
            topBox = structuredClone(box1)
            bottomBox = structuredClone(box2)
        }
        if(topBox.height<0){
          topBox.y = topBox.y-topBox.height
          topBox.height = abs(topBox.height)
        }
        if(bottomBox.height<0){
          bottomBox.y = bottomBox.y-bottomBox.height
          bottomBox.height = abs(bottomBox.height)
        }


        // if the topbox has the negative height, just fork with it to fix it
        



        // console log the topbox and bottom box's y values with labels

        if(topBox.y+abs(topBox.height)>bottomBox.y+abs(bottomBox.height)){
            // bottom box is smaller, so make aimedHeight the center of the bottom box
            aimedHeight = (bottomBox.y+abs(bottomBox.height)/2)
        } 

        else{
            topBoxsBottom = topBox.y+abs(topBox.height)
            bottomBoxsTop = bottomBox.y
            aimedHeight = (topBoxsBottom+bottomBoxsTop)/2
            // if the bottom of the higher box is higher than the top of the lower box, we want to aim for 
            // the bottom of the higher box
            if(bottomBoxsTop>topBoxsBottom){
                aimedHeight = topBoxsBottom
        }

        }
        
        // If the two boxes have no overlap on the y values, force the aimed height to be the top of the higher box

        let startPoint = {x:startX,y:aimedHeight}
        let endPoint = {x:endX,y:aimedHeight}
        return [startPoint,endPoint]
    }
    createVector(x,y){
      return {x:x,y:y}
    }
    map(value, min1, max1, min2, max2) {
      // first, normalize the input value to a range between 0 and 1
      const normalized = (value - min1) / (max1 - min1);
      
      // then, map the normalized value to the output range
      const mapped = normalized * (max2 - min2) + min2;
      
      // return the mapped value
      return mapped;
    }
    constructor(startBox, endBox,density=40,thickness=1,springheight=5){
        this.startBox = startBox
        this.endBox = endBox

        let defPoints = this.checkPosition(startBox,endBox)
        
        this.start = defPoints[0]
        this.end = defPoints[1]

        this.current_start= this.start
        this.current_end = this.end

        let width = abs(this.end.x-this.start.x)
        

        this.thickness = thickness
        this.densityRaw = density
        this.density = density/(.25*(spring_constants+20))
        this.numLines = Math.round((width/density)-1);
        this.lineLength =  springheight;

        // Initialize an array to hold the points of the zigzag
        this.points = [];
        for (let i = 0; i < this.numLines; i++) {
            const x = this.map(i, 0, this.numLines - 1, this.start.x, this.current_end.x);
            const y = this.start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
            this.points.push(this.createVector(x, y));
        }
        
        // Each of these nodes is a Box object, I want to make it so that the start and endpoint of
        // the line, are at the inside edges between the two boxes
    }
    move() {
      // Move the endpoint
      let defPoints = this.checkPosition(this.startBox,this.endBox)
      this.current_start = defPoints[0]
      this.current_end = defPoints[1]

      this.current_end.x = end_displacement;
      this.current_start.x = start_displacement;
      // Recalculate the position of all the other points
      for (let i = 0; i < this.numLines; i++) {
        const x = this.map(i, 0, this.numLines - 1, this.current_start.x, this.current_end.x);
        const y = this.current_start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
        this.points[i] = this.createVector(x, y);
      }
      
    }
    updateWinds(){
      let width = abs(this.current_end.x-this.current_start.x)
      this.numLines = Math.round((width/this.density)-1);
      // Run this if we are still creating the springs, which means we don't want them to show
      // being deformed, just extended
    }
    draw() {
        this.points = [];
        for (let i = 0; i < this.numLines; i++) {
            const x = this.map(i, 0, this.numLines - 1, this.current_start.x, this.current_end.x);
            const y = this.current_start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
            this.points.push(this.createVector(x, y));
        }
        
        beginShape();
        fill(0,0,0,0)
        stroke(255,255,0)

        strokeWeight(this.thickness)
        vertex(this.current_start.x, this.current_start.y);
        for (let i = 0; i < this.numLines; i++) {
          vertex(this.points[i].x, this.points[i].y);
        }
        vertex(this.current_end.x, this.current_end.y);
        endShape();
        let defPoints = this.checkPosition(this.startBox,this.endBox)
        this.current_start = defPoints[0]
        this.current_end = defPoints[1]
        strokeWeight(1)
        
      }
      


}
function drawGradientRect(x, y, w, h) {
  // Create a custom fill function that interpolates between c1 and c2
  // based on the horizontal position of the current pixel
  c1 = color('#0060df');
  c2 = color(0, 255, 255)
  for (let i = x; i < x + w; i++) {
    let pct = (i - x) / w;
    let c = lerpColor(c1, c2, pct);
    stroke(c);
    line(i, y, i, y + h);
  }

  // Draw a border around the rectangle
  noFill();
  strokeWeight(4);
  stroke('#0D00E0');
  rect(x, y, w, h);
}
class Box {
    constructor(x, y, n, w, h) {
      this.x_i = x; // initial x position
      this.x =x
      this.y = y; // initial y position
      this.n = n; // value of the box
      this.delta = 0; // current displacement on x
      this.width = w; // width of the box
      this.height = h; // height of the box
      this.links = [] //Who this box is connected to
      this.mass = abs(this.width*this.height)/1000
      console.log(this.mass)
      initialConditions.push([0,0])
      driverParameters.push([0,0,0])
      anchorStates.push(false)

    }
    move(delta) {
      this.x = this.x_i + delta;
    }
    draw() {
      strokeWeight(3)
      stroke('#0060df');

      fill(0, 255, 255)
      

      drawGradientRect(this.x, this.y, this.width, this.height);
      
    }
  }
