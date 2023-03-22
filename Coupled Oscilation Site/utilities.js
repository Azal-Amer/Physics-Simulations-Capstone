const math = require('mathjs');
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
    if(wallMount ==True){
        wallMount =1
    }
    if(n<1){
        return null
    }
    let K = math.zeros([n, n]);
    for (let i = 0;i<n;i++){
        if(i ==0){
            K[i][0]=wallMount*oscillator_List[i].spring_constant+oscillator_List[i+1].spring_constant
            K[i][1]= -oscillator_List[i+1].spring_constant
        }
        else if(i ==n-1){
            K[i][n-2]= -oscillator_List[i].spring_constant
            K[i][n-1]= oscillator_List[i].spring_constant
        }
        else{
            for(let j = 0;j<=n;i++){
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
        return K
    }
}
  
function chainedKMatrix(n,oscillator_List,wallMount = True){
    if(wallMount ==True){
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
            for(let j = 0;j<=n;i++){
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
        return B
    }
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


    for(let i = 0;i <=n;i++){
    driver.push(driverContructor(parameters[i][0],parameters[i][1],parameters[i][2]))
    }
    return driver
    //chatGPT'd the above   
}

const nj = require('numjs');
const _ = require('lodash');

function coefficientIsolater(vector, square, n) {
  const focusRow = nj.array(square).slice(n, n+1);

  const vectorWithoutN = _.concat(_.slice(vector, 0, n), _.slice(vector, n+1));
  const focusRowWithoutN = _.concat(_.slice(focusRow.tolist(), 0, n), _.slice(focusRow.tolist(), n+1));

  const constant = nj.dot(vectorWithoutN, focusRowWithoutN);

  const coefficient = focusRow.tolist()[0][n];

  return [coefficient, constant];
}


