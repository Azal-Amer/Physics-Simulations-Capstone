function Simulator(N,wallMount,mass,K,x_0){
    debugging =false
    oscillator_List=[]
    spring_constant=1


    // wallMount= true

    // # number of objects
    M = mass
    // # nx1 vector representing the mass of each object
    initSprings = extend_array([spring_constant],N)
    console.log(initSprings)
    // # nx1 matrix representing the spring constants associated with each object

    driverParameters = extend_array([[0,.7,.2],[0,2,5],[0,2,-1]],N)

    // # nx3 matrix representing the parameters of the driving force for each object, [amplitude, frequency, phase]
    DrivingForce = driverPopulator(N,driverParameters)

    dragForce = extend_array([0],N)

    // # x1 vector representing the drag force for each object
    initialConditions = extend_array([[0,0],[0,0],[0,0]],N)
    initialConditions[0] = [x_0,0]
    console.log('x_0',x_0)
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

    // const v_current = initialConditions.map((ic) => ic[1]);
    if(debugging == true){
        
    console.log('v_current',v_current)
    console.log('x_current',x_current)
    }
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
    K = chainedKMatrix(N,oscillator_List,wallMount = wallMount)
    
    // # ^^This has a leading spring

    console.log('K Matrix')
    // B=nj.zeros([n+1, n+1]).tolist()
    B = chainedBMatrix(n+1,oscillator_List,wallMount = true)

    time = 40
    dt = 0.004
    var startTime = performance.now()
    RKCalculator(time, dt,N)
    var endTime = performance.now()
    console.log(`Call to calculate ${N} oscilators took ${endTime - startTime} milliseconds`)
    console.log('RKCalculator Complete')
    console.log(oscillator_List[0].x_i)
    return oscillator_List
}
// Write a loading page and guestimate the calculation time, it's a function of 
// the number of objects, the number of time steps, and the number of iterations