let N = 7
const debugging =false



// # number of objects
M = extend_array([1,2,3],N)
// # M = [1,20,1]
M[0]=1
// # nx1 vector representing the mass of each object
initSprings = extend_array([4],N)
// # nx1 matrix representing the spring constants associated with each object

driverParameters = extend_array([[0,.7,.2],[0,2,5],[0,2,-1]],N)
driverParameters[0] = [50,5,0]
// # nx3 matrix representing the parameters of the driving force for each object, [amplitude, frequency, phase]
DrivingForce = driverPopulator(N,driverParameters)

dragForce = extend_array([.005],N)
// # dragForce[0] = .05
// # x1 vector representing the drag force for each object
initialConditions = extend_array([[0,0],[0,0],[0,0]],N)
initialConditions[0] = [0,10]
// # nx2 matrix representing the initial conditions for each object, [position, velocity]

 x_current = initialConditions.map((ic) => ic[0]);
// a 1xn vector containing the current positions of each object
if(debugging == true){
    console.log('initialConditions',initialConditions)
}

//  v_current = initialConditions.map(row => [row[1]]);
v_current = []
for (let i = 0; i < initialConditions.length; i++) {
    v_current[i] = [initialConditions[i][1]];
  }

if(debugging == true){
    console.log('constructed v_current',v_current)
}

// a j{1,4}xn vector containing the current velocities of each object
ihatejavascript = [0]
console.log(ihatejavascript)
// const v_current = initialConditions.map((ic) => ic[1]);
if(debugging == true){
    
console.log('v_current',v_current)
console.log('x_current',x_current)
}


const x_currentEuler = initialConditions.map((ic) => ic[0]);
const v_currentEuler = initialConditions.map((ic) => ic[1]);
// # Two 1xn vectors containing the current positions and velocities of each object

oscillator_List = []
// # Oscillators is the list of oscillator objects
for(let i=0;i<N;i++){
    console.log(i)
    oscillator = new Oscillator(x_0=initialConditions[i][0],v_0=initialConditions[i][1],spring_constant=initSprings[i],A=1, mass = M[i],n = i,iteration = 0,Drag = dragForce[i],drivingForce=DrivingForce[i])
    oscillator_List.push(oscillator)
    
}
//     # create an oscillator object for each object
//     # calculate the next step
// # Now that the oscillators are constructed, I can create the K and B matrix
// # K = np.array([[oscillator_List[1].spring_constant+oscillator_List[0].spring_constant,-oscillator_List[1].spring_constant],[-oscillator_List[1].spring_constant,oscillator_List[1].spring_constant]])
K = chainedKMatrix(n+1,oscillator_List,wallMount = true)
// # ^^This has a leading spring

console.log('K Matrix')
B=nj.zeros([n+1, n+1]).tolist()
// # B = chainedBMatrix(n,oscillator_List,wallMount = True)

time = 200
dt = 0.004
RKCalculator(time, dt)
console.log('RKCalculator Complete')
console.log(oscillator_List[0].x_i)

