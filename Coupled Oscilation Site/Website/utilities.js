
function extend_array(arr, n) {
    let extended_arr = arr.slice();
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < n; j++) {
        if (extended_arr.length >= n) {
          break;
        }
        extended_arr.push(arr[i]);
      }
      if (extended_arr.length >= n) {
        break;
      }
    }
    
    let duplicated_values = extended_arr.slice(arr.length);
    duplicated_values = duplicated_values.sort(() => Math.random() - 0.5);
    extended_arr.splice(arr.length, duplicated_values.length, ...duplicated_values);
    
    return extended_arr.slice(0, n);
  }
  
function chainedKMatrix(n,oscillator_List,wallMount = True){
    if(wallMount ==true){
        wallMount =1
    }
    if(n<1){
        return null
    }
    let K = math.zeros([n, n]);
    for (let i = 0;i<n;i++){
        console.log('K matrix population layer:',i)
        if(i ==0){
            K[i][0]=wallMount*oscillator_List[i].spring_constant+oscillator_List[i+1].spring_constant
            K[i][1]= -oscillator_List[i+1].spring_constant
        }
        else if(i ==n-1){
            K[i][n-2]= -oscillator_List[i].spring_constant
            K[i][n-1]= oscillator_List[i].spring_constant
        }
        else{
            for(let j = 0;j<=n;j++){
                if(j==i-1){
                    K[i][j]=-oscillator_List[i].spring_constant
                }
                else if(j==i){
                    K[i][j]=oscillator_List[i].spring_constant+oscillator_List[i+1].spring_constant
                }
                else if(j==i+1){
                    K[i][j]=-oscillator_List[i+1].spring_constant
                }
            }
        }
        
    }
    return K
}
  
function chainedBMatrix(n,oscillator_List,wallMount = true){
    if(wallMount ==true){
        wallMount =1
    }
    if(n<1){
        return null
    }
    let B = math.zeros([n, n]);
    for (let i = 0;i<n;i++){
        if(i ==0){
            B[i][0]=wallMount*oscillator_List[i].Drag+oscillator_List[i+1].Drag
            B[i][1]= -oscillator_List[i+1].Drag
        }
        else if(i ==n-1){
            B[i][n-2]= -oscillator_List[i].Drag
            B[i][n-1]= oscillator_List[i].Drag
        }
        else{
            for(let j = 0;j<=n;j++){
                if(j==i-1){
                    B[i][j]=-oscillator_List[i].Drag
                }
                else if(j==i){
                    B[i][j]=oscillator_List[i].Drag+oscillator_List[i+1].Drag
                }
                else if(j==i+1){
                    B[i][j]=-oscillator_List[i+1].Drag
                }
            }
        }
        
    }
    return B
}
function create_2d_array(arr){
    let result = []
    for(let i = 0;i<arr.length;i++){
        result.push([arr[i]])
    }
    return result
}

function driverPopulator(n,parameters){
    driver = []
    function driverConstructor(amplitude,frequency,phase){
        function driverFunction(t) {
            if (Array.isArray(t) || t instanceof Float32Array || t instanceof Float64Array || t instanceof Int8Array || t instanceof Int16Array || t instanceof Int32Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Uint16Array || t instanceof Uint32Array) {
                // take an input of arrays of times, and return an array of the driving force at each time
                let drivingValues = t.map(time => amplitude * Math.sin(frequency * time + phase));
                // just takes the array of times wanted to map across, and returns an array of the driving force at each time
                return drivingValues;
            } 
            else {
                return amplitude * Math.sin(frequency * t + phase);
            }
            }
        return driverFunction
    }

    for(let i = 0;i <n;i++){
        // console.log(i)
        driver.push(driverConstructor(parameters[i][0],parameters[i][1],parameters[i][2]))
    }
    return driver
    //chatGPT'd the above   
}


function coefficientIsolater(vector, square, n) {

const focusRow = square[n];


const vectorWithoutN = vector.slice(0, n).concat(vector.slice(n + 1));
const focusRowWithoutN = focusRow.slice(0, n).concat(focusRow.slice(n + 1));

//   if the vectorWithoutN is a 2d array, then transpose it

  let constanty = math.dot(vectorWithoutN, focusRowWithoutN);
//   console.log(square)
//   console.log('vector at ',n, ':',vector)
//     console.log('focusRow at ',n, ':',focusRow)
//     console.log('--------------')
  //   This above is the most expensive operation in the code

  if(debugging == true){
    console.log('square at beggning',square)
    console.log('vector',vector)
    console.log('focusRow',focusRow)
    console.log('focusRowWithoutN',focusRowWithoutN)
    console.log('vectorw/o n',vectorWithoutN)

}

  let coefficient = focusRow[n];
  if(debugging){
    console.log('successfully took the dot product of the vector and the focusRow')
    console.log('square at the end',square)
    console.log('coefficient',coefficient)
    console.log('constant',constant)
    console.log('---------\n')
  }

  return [coefficient, constanty];
}


