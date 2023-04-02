// class Links{
//     checkPosition(box1,box2){
//         let startBox;
//         let endBox;
//         let topBox;
//         let bottomBox;
//         let startX;
//         let endX;
//         let topBoxsBottom;
//         let bottomBoxsTop;
//         let aimedHeight;

//         // X VALUES CALCULATION
//         if(box1.x>box2.x){
//             startBox = box2
//             endBox = box1
//         }
//         else{
//             startBox = box1
//             endBox = box2
//         }
//         // We're checking which of the two boxes is further to the right
//         // We want to draw the line from the right side of the left box to the left side of the right box
//         startX= startBox.x+startBox.width
//         endX = endBox.x

//         // Y VALUES CALCULATION
//         if(box1.y>box2.y){
//             topBox = box2
//             bottomBox = box1
//         }
//         else{
//             topBox = box1
//             bottomBox = box2
//         }
//         // console log the topbox and bottom box's y values with labels

//         if(topBox.y+topBox.height>bottomBox.y+bottomBox.height){
//             // bottom box is smaller, so make aimedHeight the center of the bottom box
//             aimedHeight = (bottomBox.y+bottomBox.height/2)
//         } 
//         else{
//             topBoxsBottom = topBox.y+topBox.height
//             bottomBoxsTop = bottomBox.y
//             aimedHeight = (topBoxsBottom+bottomBoxsTop)/2
//             // if the bottom of the higher box is higher than the top of the lower box, we want to aim for 
//             // the bottom of the higher box
//             if(bottomBoxsTop>topBoxsBottom){
//                 aimedHeight = topBoxsBottom
//         }

//         }
        
//         // If the two boxes have no overlap on the y values, force the aimed height to be the top of the higher box

//         let startPoint = {x:startX,y:aimedHeight}
//         let endPoint = {x:endX,y:aimedHeight}
//         return [startPoint,endPoint]
//     }
//     constructor(startBox, endBox){
//         this.startBox = startBox
//         this.endBox = endBox
//         let defPoints = this.checkPosition(startBox,endBox)
//         this.startPoint = defPoints[0]
//         this.endPoint = defPoints[1]
        
//         // Each of these nodes is a Box object, I want to make it so that the start and endpoint of
//         // the line, are at the inside edges between the two boxes
//     }
//     draw(){
//         stroke(3)
//         line(this.startPoint.x,this.startPoint.y,this.endPoint.x,this.endPoint.y)
//         // draw the line
//         let defPoints = this.checkPosition(this.startBox,this.endBox)
//         this.startPoint = defPoints[0]
//         this.endPoint = defPoints[1]
//         // update the endpoints
//     }

// }
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
        startX= startBox.x+startBox.width
        endX = endBox.x

        // Y VALUES CALCULATION
        if(box1.y>box2.y){
            topBox = box2
            bottomBox = box1
        }
        else{
            topBox = box1
            bottomBox = box2
        }
        // console log the topbox and bottom box's y values with labels

        if(topBox.y+topBox.height>bottomBox.y+bottomBox.height){
            // bottom box is smaller, so make aimedHeight the center of the bottom box
            aimedHeight = (bottomBox.y+bottomBox.height/2)
        } 
        else{
            topBoxsBottom = topBox.y+topBox.height
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
    constructor(startBox, endBox,density=5,thickness=10,springheight=5){
        this.startBox = startBox
        this.endBox = endBox

        let defPoints = this.checkPosition(startBox,endBox)
        
        this.start = defPoints[0]
        this.end = defPoints[1]

        this.current_start= this.start
        this.current_end = this.end

        let width = abs(this.end.x-this.start.x)
        

        this.thickness = thickness
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
    draw() {
        // Draw the zigzag on the canvas
        
        beginShape();
        fill(0,0,0,0)
        strokeWeight(this.thickness)
        vertex(this.current_start.x, this.start.y);
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
      this.mass = width*height/40000
      console.log(this.mass)
    }
    move(delta) {
      this.x = this.x_i + delta;
    }
    draw() {
      rect(this.x, this.y, this.width, this.height);
      
    }
  }
  class Spring {
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
    constructor(length = 200, numLines=5,x_i=width/2,y_i=height/2,thickness=10,springheight = 10) {
      
      // Initialize start and end points
      x_i = length/2 + x_i
      y_i = y_i*2
      this.start = this.createVector(x_i - length / 2, y_i / 2);

      this.end = this.createVector(x_i / 2 + length / 2, y_i / 2);
      this.current_end =this.createVector(x_i / 2 + length / 2, y_i / 2);
      this.current_start = this.createVector(x_i - length / 2, y_i / 2);
      this.thickness = thickness
      
      // Initialize properties of the zigzag
      this.numLines = numLines;
      this.lineLength =  springheight;
      
      // Initialize an array to hold the points of the zigzag
      this.points = [];
      for (let i = 0; i < numLines; i++) {
        const x = this.map(i, 0, numLines - 1, this.start.x, this.current_end.x);
        const y = this.start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
        this.points.push(this.createVector(x, y));
      }
    }
    
    draw(sketch) {
      // Draw the zigzag on the canvas
      sketch.beginShape();
      sketch.fill(0,0,0,0)
      sketch.strokeWeight(this.thickness)
      sketch.vertex(this.current_start.x, this.start.y);
      for (let i = 0; i < this.numLines; i++) {
        sketch.vertex(this.points[i].x, this.points[i].y);
      }
      sketch.vertex(this.current_end.x, this.current_end.y);
      sketch.endShape();
    }
    
    move(end_displacement,start_displacement) {
      // Move the endpoint
      this.current_end.x = end_displacement;
      this.current_start.x = start_displacement;
      // Recalculate the position of all the other points
      for (let i = 0; i < this.numLines; i++) {
        const x = this.map(i, 0, this.numLines - 1, this.current_start.x, this.current_end.x);
        const y = this.current_start.y + ((i % 2 === 0) ? this.lineLength : -this.lineLength);
        this.points[i] = this.createVector(x, y);
      }
      
    }
  
  
  
  }