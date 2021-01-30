/*
newMap should behave as map function does with an Array
Syntax
let newArray = arr.map(callback(currentValue[, index[, array]]) {
  // return element for newArray, after executing something
}[, thisArg]);
*/

let arr = [1,2,3,4];

Array.prototype.newMap = function(fn) {
  let curArray = this;
  let res = [];
  for(let index=0;index<curArray.length;index++){
    res.push(fn(curArray[index],index,curArray));
  }
  return res;
}

let newArr = arr.newMap( ele => 2*ele);
console.log(arr);
console.log(newArr);