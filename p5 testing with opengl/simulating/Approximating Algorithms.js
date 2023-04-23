function zerothOrderParam(string_length) {

  function outputParam(t) {
    return (9.8 * Math.sin(t) / string_length);


  }
  return outputParam

}
// Let's you enclose the zeroth derivative in a function

function firstOrderParam(v) {
  return v;
}
// Let's you enclose the first derivative in a function
function firstOrder(v_0, x_0, h) {
  let x_1 = h * v_0 + x_0
  return x_1
}
// Evaluates the first order of the diffEQ approximation according to the input params

function secondOrder(v_0, x_1, h, b, a, c, d, t, zerothOrderParam, firstOrderParam) {
  // h is the step size
  // b is the coefficient on the first derivative
  // a is the coefficient on the second derivative
  // c is the coefficient on the zeroth derivative
  // d is the driving force
  // t is the time
  // zerothOrderParam is the function that returns the zeroth derivative
  // firstOrderParam is the function that returns the first derivative
  const slope = (d(t) - b(t) * firstOrderParam(v_0) - c(t) * zerothOrderParam(x_1)) / a(t);

  const v_1 = h * slope + v_0;

  return v_1
}
// Evaluates the second order of the diffEQ approximation according to the input params
function RK_weighting(v) {
  const v_weighted = 1 / 6 * (v[0] + 2 * v[1] + 2 * v[2] + v[3])
  return v_weighted
}
// Weighs the first derivative using the RK4 technique
function euler(x_0, v_0, iterations, h, a, b, c, d, zerothOrderParam, firstOrderParam) {
  const x = [];
  const times = [];
  for (let i = 0; i < int(iterations / h); i++) {
    t = h * i;
    x_1 = firstOrder(v_0, x_0, h);
    // # This term is recorded in this iteration
    v_1 = secondOrder(v_0, x_1, h, b, a, c, d, t, zerothOrderParam, firstOrderParam);
    // # This term is used in the second iteration
    x_0 = x_1;
    x.push(x_0);
    times.push(t);
    v_0 = v_1;
  }
  return [x, times];
}
// Combines all the above functions to approximate a standard second order diffeq using Eulers method
function RK4(x_0, v_0, iterations, h, a, b, c, d, zerothOrderParam, firstOrderParam) {
  // console.log(x_0,v_0,iterations,h)
  // console.log(a,b,c,d,zerothOrderParam,firstOrderParam)
  let x = [];
  let timey = [];
  let velocity = []
  for (let i = 0; i < Math.round(iterations / h); i++) {
    const t_i = i * h
    let v = [v_0]
    for (let j = 0; j < 3; j++) {
      let x_j = firstOrder(v[j], x_0, h);

      // # This term is recorded in this iteration
      let v_new = secondOrder(v[j], x_j, h, b, a, c, d, t_i, zerothOrderParam, firstOrderParam)
      v.push(v_new);
      // # This term is used in the second iteration
      x_0 = x_j;
    }
    //     # x_i is an imaginary point used for calculation
    // # with the weighted average of this v, we then actually do the x step size
    let v_weighted = RK_weighting(v);
    // vweighted is the output velocity from the 4 step RK4, RK_weighting takes an array of length n, and weighs it according to the RK parameters
    let x_1 = firstOrder(v_weighted, x_0, h);
    // Does the first order position calculations
    x.push(x_1);
    timey.push(t_i);

    x_0 = x_1;
    v_0 = v_weighted;
    velocity.push(v_0)
  }
  const xInterp = []
  const timeInterp = []
  const vInterp = []
  for (var i = 0; i < x.length; i++) {
    if (i % 24 == 0) {
      xInterp.push(x[i])
      timeInterp.push(timey[i])
      vInterp.push(velocity[i])
    }

  }
  x = xInterp.slice(0)
  timey = timeInterp.slice(0);
  velocity = vInterp.slice(0)
  timeInterp.splice(0, timeInterp.length)
  vInterp.splice(0, vInterp.length)
  xInterp.splice(0, xInterp.length)
  // console.log(x)


    // Calculating Driving Force values
    // Plug in every value of timey into the function d(t), then save it to the array drivingForceVals
    let drivingForceVals = []
    for(let i=0;i<timey.length;i++){
        drivingForceVals.push(d(timey[i]))
    }

    return [x,timey,velocity,drivingForceVals]
  }

function Derivative(RK) {
  derivative = []
  timew = []
  // RK[0] is the positions, RK[1] is the times
  iterations = RK[0].length - RK[0].length % 2
  for (let i = 0; i < iterations; i++) {
    let deri = RK[0][i + 1] - RK[0][i];
    let midTime = (RK[1][i + 1] + RK[1][i]) / 2;
    derivative.push(deri / midTime);
    timew.push(midTime);
    // set the derivative value at the midpoint of times
  }
  return [derivative, timew]

}
// Input a list, output the derivative of that list, length of (n-1)
function Smoothery(RK1) {
  velocity = Derivative(Derivative(RK1))[0]
  // console.log(velocity)
  let x = RK1[0].slice()
  let y = RK1[1].slice()
  tolerance = .000001

  for (let i = x.length; i > 0; i--) {
    // leftTolerance = Math.abs(x[i+1]-x[i])
    // rightTolerance = Math.abs(x[i]-x[i-1])
    if ((i != 0) && Math.abs(velocity[i]) < tolerance && velocity[i] != velocity[-1]) {
      x.splice(i, 1)
      y.splice(i, 1)
    }
    else {
      // console.log(velocity[i])
      // console.log(leftTolerance,rightTolerance)
    }

  }
  x.push(RK1[0][RK1[0].length - 1]);
  y[y.length - 2] = y[y.length - 2] + (y[y.length - 4] - y[y.length - 3])
  y.push(RK1[1][RK1[1].length - 1]);
  // console.log(y)
  return [x, y]

}
// My attempt at clever interpolation, trying to retain points with high acceleration values, a
// and drop ones with values below a tolerance
function Smoother(RK) {
  let x = RK[0].slice(0);
  let y = RK[1].slice(0);
  let xInterp = []
  let timeInterp = []
  for (var i = 0; i < x.length; i++) {
    if (i % 10 == 0) {
      xInterp.push(x[i])
      timeInterp.push(y[i])
    }

  }
  x = xInterp.slice(0)
  y = timeInterp.slice(0);
  timeInterp.splice(0, timeInterp.length)
  xInterp.splice(0, xInterp.length)
  return [y, x]
}
// Literally just extrapolates the input lists by a factor of 10

