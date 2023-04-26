// # COEFFICIENTS
const x_0 = 0;
const v_0 = 0;
const string_length = 10;
function A(t) {
  return 1;
}
function getInstanceById(id) {
  const p5Instances = window['p5Instances'] || [];
  for (let i = 0; i < p5Instances.length; i++) {
    const instance = p5Instances[i];
    const element = instance._elements.find(el => el.elt.id === id);
    if (element) {
      return element.elt;
    }
  }
  return null;
}
function constantB() {
  return drag
}
function B(t, drag) {
  function constantDrag() {
    return drag
  }

  if (drag == undefined) {
    return 1;
  }
  else {
    return constantDrag
  }
}
// # Drag above
function C(t) {
  return 1;
}
function D(Amplitude = 0, frequency = 0) {
  if (Amplitude == 0 || frequency == 0) {
    function outputDriver(t) {
      return 0
    }
    return outputDriver

  }
  else {
    function outputDriver(t) {
      return Amplitude * Math.sin(frequency * t);
    }
    return outputDriver
  }
}


// # Driving forec
//     # return t
// # functions taking the derivatives as a parameter

