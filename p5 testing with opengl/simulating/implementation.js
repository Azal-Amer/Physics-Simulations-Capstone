import { firstOrder, secondOrder, RK_weighting, euler, RK4 } from './Approximating Algorithms.js';
import { A, B, C, D, zerothOrderParam, firstOrderParam, x_0, v_0, string_length } from './Parameters.js';
const time = 30;
let RKx = RK4(x_0, v_0, time, .001, A, B, C, D, zerothOrderParam, firstOrderParam)[0];
// zeroth index is x vals, first is time
// Next steps are to reduce that file size,and empty the bigger version's data
// I want to take every 10th value
const RKxInterpolated = []
for (var i = 0; i < RKx.length; i++) {
  if (i % 10 == 0) {
    RKxInterpolated.push(RKx[i])
  }
}
RKx = RKxInterpolated.splice(0)
RKxInterpolated.splice(0, RKxInterpolated.length)

console.log(RKx.length)
var delay = time / RKx.length
console.log(delay)
function storeData() {
  storeItem("red", RKx)
  console.log('ds')
}
// add a wait based on the number of frames and the time
