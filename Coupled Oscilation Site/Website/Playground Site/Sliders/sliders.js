console.log('initialized this dude')
let isClicked= false;
let selected;
let posDiv = document.getElementById('slider1');
let velDiv = document.getElementById('slider2');

function generateSliders(){
    initialPosition = createSlider(-10, 10, .25);
    initialVelocity = createSlider(-10, 10, .24);
    driverFrequency = createSlider(0, 10, .25);
    driverAmplitude = createSlider(-20, 20, 2);
    checkbox = createCheckbox('Anchored?', isClicked);
    checkbox.parent('anchor-checkbox');
    checkbox.changed(updateOscilator);

    initialPosition.parent('slider1');
    initialVelocity.parent('slider2');
    driverFrequency.parent('slider3');
    driverAmplitude.parent('slider4');

    slider1Value = createElement('p',`Initial Displacement (m): ${initialPosition.value()}`);
    slider2Value = createElement('p',`Initial Velocity (m/s): ${initialVelocity.value()}`);
    slider3Value = createElement('p',`Driver Frequency: ${driverFrequency.value()}`);
    slider4Value = createElement('p',`Driver Amplitude: ${driverAmplitude.value()}`);


    slider1Value.parent('slider1-value');
    slider2Value.parent('slider2-value');
    slider3Value.parent('slider3-value');
    slider4Value.parent('slider4-value');

    initialPosition.input(() => {slider1Value.html(`Initial Displacement ${initialPosition.value()}`);});
    initialVelocity.input(() => {slider2Value.html(`Initial Velocity: ${initialVelocity.value()}`);});
    driverFrequency.input(() => {slider3Value.html(`Driver Frequency: ${driverFrequency.value()}`);});
    driverAmplitude.input(() => {slider4Value.html(`Driver Amplitude: ${driverAmplitude.value()}`);});

    
    }

function updateCheckboxValue() {
    console.log('here')
    // update the checkbox value based on its state'
    console.log('state',checkbox.checked())
    if (checkbox.checked()) {
        checkboxValue = true;
        

        posDiv.style.display = 'none'
        velDiv.style.display = 'none'
        // select('slider1').hide();
        // select('slider2').hide();
    } 
    else {
        checkboxValue=false
        
        console.log('false')
        posDiv.style.display = 'block'
        velDiv.style.display = 'block'
        
    }
    if(!isNaN(selection)){
        anchorStates[selection] = checkbox.checked()
        linkToLatex(links,rectangles.length)
        
    }
    
}

function updateOscilator(){
    if(playground==true){
        initialPosition.elt.disabled = false;
        initialVelocity.elt.disabled = false;
        driverFrequency.elt.disabled = false;
        driverAmplitude.elt.disabled = false;
        // i only need to manipulate the initial conditions array
        // and the driver parameters array
        initialConditions[selection][0] = initialPosition.value()
        initialConditions[selection][1] = initialVelocity.value()

        console.log('trying up update driver',driverParameters[selection][0])
        driverParameters[selection][0] = driverAmplitude.value()
        driverParameters[selection][1] = driverFrequency.value()
        anchorStates[selection] = isClicked
        
        

        slider1Value.html(`Initial Displacement ${initialPosition.value()}`);
        slider2Value.html(`Initial Velocity: ${initialVelocity.value()}`);
        slider3Value.html(`Driver Frequency ${driverFrequency.value()}`);
        slider4Value.html(`Driver Amplitude ${driverAmplitude.value()}`);
        isClicked = anchorStates[selection]
        updateCheckboxValue();
        
    }
    else{
        initialPosition.elt.disabled = true;
        initialVelocity.elt.disabled = true;
        driverFrequency.elt.disabled = true;
        driverAmplitude.elt.disabled = true;

        updateSliders(selection)
    }
    selection = selection
}
function updateSliders(selected){
    selected = selected;

    console.log(selected)
    currentX_0 = initialConditions[selected][0]
    currentV_0 = initialConditions[selected][1]
    currentFrequency = driverParameters[selected][1]
    currentAmplitude = driverParameters[selected][0]
    // anchorStates[selection] = isClicked
    checkbox.checked(anchorStates[selection])
    updateCheckboxValue()


    initialPosition.value(currentX_0)
    initialVelocity.value(currentV_0)
    driverFrequency.value(currentFrequency)
    driverAmplitude.value(currentAmplitude)
    
    

    // we need to grab the current frequency and amplitude of the driver
    slider1Value.html(`Initial Displacement (m): ${initialPosition.value()}`);
    slider2Value.html(`Initial Velocity(m/s): ${initialVelocity.value()}`);
    slider3Value.html(`Driver Frequency: ${driverFrequency.value()}`);
    slider4Value.html(`Driver Amplitude: ${driverAmplitude.value()}`);


    // make a function that updates the current oscilators properties based on the sliders
    
    initialPosition.input(updateOscilator);
    initialVelocity.input(updateOscilator);
    driverFrequency.input(updateOscilator);
    driverAmplitude.input(updateOscilator);


    
    
}