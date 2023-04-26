function springEnergy(spring_constant){
    function outputFunction(spring_displacement){
        return 0.5*spring_constant*spring_displacement;
    }
    return outputFunction;
}