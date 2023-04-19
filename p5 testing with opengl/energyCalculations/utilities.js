function applyFunctionToRange(func, min, max, list) {
    // Apply the input function to each element in the input list
    const appliedList = list.map(func);
  
    // Find the minimum and maximum values in the new list
    const minValue = Math.min(...appliedList);
    const maxValue = Math.max(...appliedList);
  
    // Map the range of the new list to the input range
    const finalList = appliedList.map((value) => {
      return ((value - minValue) / (maxValue - minValue)) * (max - min) + min;
    });
  
    return finalList;
  }


// the input function would be the energy calculation function, 
// the max is the upper part of the range, and the min is the same
// then return the energies at each time interval

function calculateDifference(constant, array1, array2) {
    const result = [];
    
    for (let i = 0; i < array1.length; i++) {
      // Get the sum of corresponding values in both arrays
      const sum = (array2[i] !== undefined) ? array1[i] + array2[i] : array1[i];
      
      // Subtract the sum from the constant and add to the result array
      result.push(Math.abs(constant - sum));
    }
    
    return result;
  }