n = 60
// # number of objects
M = extend_array([1,1,1],n)
// # M = [1,20,1]
M[0]=1
// # nx1 vector representing the mass of each object
initSprings = extend_array([1],n)
// # nx1 matrix representing the spring constants associated with each object

driverParameters = extend_array([[0,.7,.2],[0,2,5],[0,2,-1]],n)
driverParameters[0] = [50,5,0]
// # nx3 matrix representing the parameters of the driving force for each object, [amplitude, frequency, phase]
drivingForce = driverPopulator(n,driverParameters)

dragForce = extend_array([.005],n)
// # dragForce[0] = .05
// # x1 vector representing the drag force for each object
initialConditions = extend_array([[0,0],[0,0],[0,0]],n)
initialConditions[0] = [0,0]
// # nx2 matrix representing the initial conditions for each object, [position, velocity]
const x_current = initialConditions.map((ic) => ic[0]);
const v_current = create_2d_array(initialConditions.map((ic) => [ic[1]]));

const x_currentEuler = initialConditions.map((ic) => ic[0]);
const v_currentEuler = initialConditions.map((ic) => ic[1]);
// # Two 1xn vectors containing the current positions and velocities of each object

oscillator_List = []
// # Oscillators is the list of oscillator objects
for(let i=0;i<n;i++){
    oscillator = Oscillator(initialConditions[i][0],initialConditions[i][1],spring_constant=initSprings[i],Drag = dragForce[i],drivingForce=drivingForce[i],n = i,iteration = 0, mass = M[i])
    oscillator_List.append(oscillator)
}
//     # create an oscillator object for each object
//     # calculate the next step
// # Now that the oscillators are constructed, I can create the K and B matrix
// # K = np.array([[oscillator_List[1].spring_constant+oscillator_List[0].spring_constant,-oscillator_List[1].spring_constant],[-oscillator_List[1].spring_constant,oscillator_List[1].spring_constant]])
K = chainedKMatrix(n,oscillator_List,wallMount = True)
// # ^^This has a leading spring

B=np.zeros((n,n))
// # B = chainedBMatrix(n,oscillator_List,wallMount = True)

time = 100
dt = 0.004
