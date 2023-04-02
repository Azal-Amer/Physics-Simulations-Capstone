function firstOrder(v_0,x_0,h){
    // log the inputs if debugging is true
    if(debugging==true){
    console.log('v_0:',v_0)
    console.log('h:',h)
    }
    let x_1=h*v_0+x_0
    return x_1
}
function zerothOrderParam(x){
    return x
}
function firstOrderParam(v){
    return v
}
function RK_weighting(v){
    let v_weighing = 1/6*(v[0]+2*v[1]+2*v[2]+v[3])
    return v_weighing
}
function secondOrder(v_0,x_1,h,b,a,c,d,zerothOrderParam,firstOrderParam,constant=0,t=0){
    // console.log('constant',constant)
    // console.log('t',t)
    let slope = (d(t)-b*firstOrderParam(v_0)-c*zerothOrderParam(x_1)-constant)/a
    // print all inputs
    let v_1= h*slope+v_0
    if(debugging==true){
        console.log('v_0:',v_0)
        console.log('x_0:',x_0)
        console.log('h:',h)
        console.log('b:',b)
        console.log('a:',a)
        console.log('c:',c)
        console.log('d:',d)
        console.log('zerothOrderParam:',zerothOrderParam)
        console.log('firstOrderParam:',firstOrderParam)
        console.log('constant:',constant)
        

        console.log('slope:',slope)
        console.log('v_1:',v_1)
    }
    
    
    return v_1
}
function calculateStep(x_0,v_0,iteration,h,a,b,c,d,zerothOrderParam,firstOrderParam,constant = 0,method = 'Euler'){

    // # print all inputs
    let time = h*iteration
    let v_1 = secondOrder(v_0,x_0,h,b,a,c,d,zerothOrderParam,firstOrderParam,constant = constant,t=time)
    let x_1 = firstOrder(v_1,x_0,h)
    return [v_1,x_1]

    // # We want RK4 only to calculate the velocity for us, and then we can update velocities seperately
    
    // # Calculate the next step
}
// Im not implementing Euler at this time
class Oscillator {
    constructor(x_0 = 0, v_0 = 0, spring_constant = 1, A = 1, mass = 1,  n = 1, iteration = 1,Drag = t => 0, drivingForce = t => 0,C = t => 0) {
        this.x_h = [x_0];
        this.v_h = [v_0];
        // # Homogenous values, they are both lists containing the values of the inhomogenous values over time
        this.x_i = [x_0];
        this.v_i = [v_0];
        // # Inhomogenous values, they are both lists containing the values of the inhomogenous values over time
        // # Initial conditions
        this.spring_constant = spring_constant;
        this.t = 0;
        // time
        this.A = A;
        // coefficient on second order term
        this.Drag = Drag;
        // drag
        this.drivingForce = drivingForce;
        // solution to diffeq expression, driving force
        this.C = C;
        // coefficient on solution term
        this.iteration = iteration;
        this.n = n;
        this.mass = mass;

        
    }

    calculateRK4(K, B, dt = 0, x = 'null', v = 'null') {
        // # Input X is a 1XN vector representing the current last known position of the oscillators, temp value
        // # Input V is a (1-4)XN vector representing the current last known velocity of the oscillators, temp value
        // # to maintain compadibility with the euler method, we will have this still input a 1xN, but because we need RK4
        // # we will input a vector which is simply just the last value in each row of the current velocity array
        let v_immediate = [];
        if(debugging == true){
            console.log('OBJECT',this.n,'ITERATION',this.iteration)
        }
        
        for (let i = 0; i < v.length; i++) { 
            // # Going through the number of rows
            v_immediate.push(v[i][v[i].length - 1]);
        }
        if(debugging == true){
            console.log('v_immediate:',v_immediate)
        }
        
        
        // # v_immediate is a 1XN vector representing the last values in each of the rows of v_current
        if(debugging == true){
            console.log('solution terms:')
        }
        
        let solutionTerms = coefficientIsolater(x, K, this.n);
        if(debugging == true){
            console.log('first order terms:')
        }
        let firstOrderTerms = coefficientIsolater(v_immediate, B, this.n);
        // # Coefficient isolater takes a vector, and a square matrix, and isolates the nth coefficient and constant in that order
        
        
        let constant = firstOrderTerms[1] + solutionTerms[1];
        
        let firstOrderCoefficient = firstOrderTerms[0];
        
        let solutionCoefficient = solutionTerms[0];
        let v_0 = v_immediate[this.n];
        // # the previous velocity, is the most immediate velocity of this nth object
        let x_0 = x[this.n];

        let newPositions = calculateStep(x_0, v_0, this.iteration, dt, this.mass, firstOrderCoefficient, solutionCoefficient, this.drivingForce, zerothOrderParam, firstOrderParam, constant = constant);
        // firstOrderCoefficient, solutionCoefficient are b and c respectively
        if (v_current[this.n].length === 4) {
            let v_weighted = RK_weighting(v_current[this.n]);
            // # RK_weighing takes a 4x1 array, and outputs a single value
            const x_calculated = firstOrder(v_weighted, this.x_i[this.x_i.length - 1], dt)
            this.x_i.push(x_calculated);
            this.v_i.push(v_weighted);
            x_current[this.n] = this.x_i[this.x_i.length - 1];
            v_current[this.n] = [v_weighted];
            // # then we empty the v_current, and drop in the new seed velocity, v_weighted

            this.iteration -= 2;
            if(debugging == true){
                console.log('weighted complete')
            }
            
            // # We now need to take 2 steps back to sync up with the real clock, not the hypothetical clock
            // # It is not 3 steps, as we never took the step forward in this instance, we only took the step back. Because we still want to be 
            // # ahead of where we started weighing, we only take two steps back
        } 
        else {
            v_current[this.n].push(newPositions[0]);
            
            
            x_current[this.n] = newPositions[1];
            this.iteration += 1;
        }

        
    }
    
    // # If we have calculated all the required velocities to weigh, we perform that action, then save the actual resulting x value of that 
    // # velocity to the object's self, we then also restart the velocity list to have it's first term be v_weighted, and start over

    // # What we can do, is calculate JUST the velocity, return it here, run the check on the length of the corresponding velocity list,
    // # then if it is equal to four we are able to calculate the next position.
    // # What I'd prefer to do, is only run this check if we are the last oscilator in the sequence, then use matrix math to optimize
    // # that way we calculate the next position all at once by stepping our weighted velocity matrix by one, and then multiplying it by the step
}

function RKCalculator(time, dt,N) {
    const iterations = Math.floor(4 * time / dt);
    for (let i = 0; i < iterations; i++) {
        for (let j = 0; j < N; j++) {
            oscillator_List[j].calculateRK4(K, B, dt = dt,x = x_current,v=v_current);
            // x_currentEuler[j] = oscillator_List[j].x_Euler[-1];
            // v_currentEuler[j] = oscillator_List[j].v_Euler[-1];
            // console.log('calculated value', oscillator_List[0].x_i[-1]);
            // console.log('captured value', x_current);
        }
    }
}