function zerothOrderParam(string_length){
  
  function outputParam(t){ 
      return (9.8*Math.sin(t)/string_length);

      
  }
  return outputParam
  
}
function firstOrderParam(v){
  return v ;
}
function firstOrder(v_0,x_0,h){
    let x_1=h*v_0+x_0
    return x_1
  }
function secondOrder(v_0,x_1,h,b,a,c,d,t,zerothOrderParam,firstOrderParam){
      const slope = (d(t)-b(t)*firstOrderParam(v_0)-c(t)*zerothOrderParam(x_1))/a(t);

      const v_1= h*slope+v_0;
      return v_1
  }
function RK_weighting(v){
      const v_weighted = 1/6*(v[0]+2*v[1]+2*v[2]+v[3])
      return v_weighted
  }
function euler(x_0,v_0,iterations,h,a,b,c,d,zerothOrderParam,firstOrderParam){
    const x = [];
    const times = [];
    for (let i=0;i< int(iterations/h);i++){
        t = h*i;
        x_1 = firstOrder(v_0,x_0,h);
        // # This term is recorded in this iteration
        v_1 = secondOrder(v_0,x_1,h,b,a,c,d,t,zerothOrderParam,firstOrderParam);
        // # This term is used in the second iteration
        x_0 = x_1;
        x.push(x_0);
        times.push(t);
        v_0 = v_1;
    }
    return [x,times];
  }
  function RK4(x_0,v_0,iterations,h,a,b,c,d,zerothOrderParam,firstOrderParam){
    // console.log(x_0,v_0,iterations,h)
    // console.log(a,b,c,d,zerothOrderParam,firstOrderParam)
    let x=[];
    let timey = [];
    for(let i=0;i<Math.round(iterations/h);i++){
        const t_i = i*h
        let v = [v_0]
        for(let j=0;j<3;j++){
            let x_j = firstOrder(v[j],x_0,h);
            
            // # This term is recorded in this iteration
            let v_new = secondOrder(v[j],x_j,h,b,a,c,d,t_i,zerothOrderParam,firstOrderParam)
            v.push(v_new);
            // # This term is used in the second iteration
            x_0 = x_j;
        }
          //     # x_i is an imaginary point used for calculation
          // # with the weighted average of this v, we then actually do the x step size
        let v_weighted = RK_weighting(v);
            // v = v_weighted;
        let x_1 = firstOrder(v_weighted,x_0,h);
        x.push(x_1);
        timey.push(t_i);
        x_0=x_1;
        v_0 = v_weighted;
      }
    const xInterp=[]
    const timeInterp=[]
    for(var i=0;i<x.length;i++){
        if(i%24==0){
            xInterp.push(x[i])
            timeInterp.push(timey[i])
        }
        
    }
    x = xInterp.slice(0)
    timey = timeInterp.slice(0);
    timeInterp.splice(0,timeInterp.length)
    xInterp.splice(0, xInterp.length)
    // console.log(x)

    return [x,timey]
  }

function Derivative(RK){
  derivative = []
  timew = []
  // RK[0] is the positions, RK[1] is the times
  iterations = RK[0].length-RK[0].length%2
  for(let i=0;i<iterations;i++){
    let deri = RK[0][i+1]-RK[0][i];
    let midTime = (RK[1][i+1]+RK[1][i])/2;
    derivative.push(deri/midTime);
    timew.push(midTime);
    // set the derivative value at the midpoint of times
  }
  return [derivative,timew]

}
function Smoothery(RK1){
  velocity=Derivative(Derivative(RK1))[0]
  // console.log(velocity)
  let x = RK1[0].slice()
  let y=RK1[1].slice()
  tolerance = .000001

  for(let i = x.length; i>0;i--){
    // leftTolerance = Math.abs(x[i+1]-x[i])
    // rightTolerance = Math.abs(x[i]-x[i-1])
    if((i!=0) && Math.abs(velocity[i])<tolerance && velocity[i]!=velocity[-1]){
      x.splice(i,1)
      y.splice(i,1)
    }
    else{
      // console.log(velocity[i])
      // console.log(leftTolerance,rightTolerance)
    }
    
  }
  x.push(RK1[0][RK1[0].length-1]);
  y[y.length-2]=y[y.length-2]+(y[y.length-4]-y[y.length-3])
  y.push(RK1[1][RK1[1].length-1]);
  // console.log(y)
  return [x,y]

}
function Smoother(RK){
  let x=RK[0].slice(0);
  let y=RK[1].slice(0);
  let xInterp=[]
  let timeInterp=[]
  for(var i=0;i<x.length;i++){
      if(i%10==0){
          xInterp.push(x[i])
          timeInterp.push(y[i])
      }
      
  }
  x = xInterp.slice(0)
  y = timeInterp.slice(0);
  timeInterp.splice(0,timeInterp.length)
  xInterp.splice(0, xInterp.length)
  return [y,x]
}

