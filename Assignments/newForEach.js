/*
newForEach should work same as forEach function does with an Array
Syntax
let newArray = arr.map(callback(currentValue[, index[, array]]) {
  // return element for newArray, after executing something
}[, thisArg]);
*/

let arr = [1,2,3,4];

Array.prototype.newForEach = function(fn) {
  let curArray = this;
  for(let index=0;index<curArray.length;index++){
    fn(curArray[index],index,curArray);
  }
}
arr.newForEach( (ele,idx) => console.log(ele,idx));