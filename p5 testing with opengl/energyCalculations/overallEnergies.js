// take an input of the position and velocity list
// then take an input of the energies type, 

function energyCalculator(positionList, velocityList,isSpring) {
    let potentialEnergy;
    let KE;
    let heat;
    if(isSpring){
        potentialEnergy = applyFunctionToRange(springEnergy(spring_constant), 0, 300, positionList);
    }
    else{
        potentialEnergy = applyFunctionToRange(gravitationalPotentialEnergy(1), 0, 300, positionList);
    }
    KE = applyFunctionToRange(kineticEnergy(1), 0, 300, velocityList);
    // total energy is going to be the sum of the first value on potential energy, and the first value on kinetic energy
    let totalEnergy = potentialEnergy[1] + KE[1];
    console.log(velocityList)
    // heat is going to be the difference between the total energy and the sum of each energies over tieme
    heat = calculateDifference(totalEnergy, potentialEnergy, KE);
    energies = {'heat':heat,'potentialEnergy':potentialEnergy,'kineticEnergy':KE,'totalEnergy':totalEnergy};
    return energies;
}

