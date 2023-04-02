
let slider1, slider2, slider3, slider4;
let slider1Value, slider2Value, slider3Value, slider4Value;
var coupledSprings = function(sketch){
    sketch.setup = function(){
        N = 5
        wallMount = true
        oscillator_List = Simulator(N,wallMount,1,5,-10)
        coupledCanvas = sketch.createCanvas(1200, 400);
        coupledCanvas.parent('coupled-canvas-container');
        frame = 0
        paused = false
        boxArray = []
        springArray = []
        for(let i = 0; i<N; i++){
            boxArray.push(new Box(100+i*150, 200, 10, 50, 50))
            springConstant = oscillator_List[i].spring_constant
            springArray.push(new Spring(length = 150,numLines=5*springConstant,x_i = i*150,y_i = 225,thickness = 1,springheight = 5))
        }

        slider1 = sketch.createSlider(2, 8, 1);
        slider2 = sketch.createSlider(2, 20, 1);
        slider3 = sketch.createSlider(1, 5, 1);
        slider4 = sketch.createSlider(0, 20, 2);
        slider1.parent('slider1');
        slider2.parent('slider2');
        slider3.parent('slider3');
        slider4.parent('slider4');

        slider1Value = sketch.createElement('p',`Number of Oscillators: ${slider1.value()}`);
        slider2Value = sketch.createElement('p',`Spring Constant: ${slider2.value()}`);
        slider3Value = sketch.createElement('p',`Mass: ${slider3.value()}`);
        slider4Value = sketch.createElement('p',`Initial Displacement: ${slider4.value()}`);
        slider1Value.html(`Number of Oscilators: ${slider1.value()}`);
        slider2Value.html(`Spring Constant (N/m): ${slider2.value()}`);
        slider3Value.html(`Mass (kg): ${slider3.value()}`);
        slider4Value.html(`Initial Displacement (m): ${slider4.value()}`);

        slider1Value.parent('slider1-value');
        slider2Value.parent('slider2-value');
        slider3Value.parent('slider3-value');
        slider4Value.parent('slider4-value');

        slider1.input(() => {
            slider1Value.html(`Number of Oscilators: ${slider1.value()}`);
          });
          slider2.input(() => {
            slider2Value.html(`Spring Constant (N/m): ${slider2.value()}`);
          });
          slider3.input(() => {
            slider3Value.html(`Mass (kg): ${slider3.value()}`);
          });
          slider4.input(() => {
            slider4Value.html(`Initial Displacement (m): ${slider4.value()}`);
          });

    }
    sketch.draw = function(){

        slider1.changed(updateSim);
        slider2.changed(updateSim);
        slider3.changed(updateSim);
        slider4.changed(updateSim);

        sketch.background(220);
        if(paused == false){
            frame += 1
        }
        for(let i = 0; i<boxArray.length; i++){
            boxArray[i].move(5*oscillator_List[i].x_i[frame*5])
            
            
            if(i >0){
                springArray[i].move(boxArray[i].x,boxArray[i-1].x+50)
            }
            else{
                springArray[i].move(boxArray[i].x,springArray[i].start.x)
            }
            if(wallMount == true || i!=0){
                springArray[i].draw(sketch)
            }
            boxArray[i].draw(sketch)
        }
        if(frame>oscillator_List[0].x_i.length/5){
            frame = 0
        }


        // make 6 boxes centered at 
        
    }

}
new p5(coupledSprings);
