/*
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

/*
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

/*
Syntax
let boundFunc = func.bind(thisArg[, arg1[, arg2[, ...argN]]])
*/

Function.prototype.newBind = function(...args){
  let curFunction = this;
  let bindingObject = args[0];
  let params = args.slice(1);
  return function(...localArgs){
    let functionArgs = params.concat(localArgs);
    curFunction.apply(bindingObject,functionArgs); 
  }
}

let fn = function(obj){
  console.log(this + obj);
}

let obj = "Hello";
let bindChk = fn.newBind(obj);
bindChk();
bindChk(" World");


 /*
 Implement a function called memoize which takes a function as an input. For example - below, memoize takes the "factorialFunc" function as an input and returns the factorial value of the number passed to "factorialFunc" function as an argument.

 The first time when memoizedFactorial is invoked with an argument, it will take some time to calculate and return the factorial value for that integer but when invoked the second time immediately with the same integer value, result be generated instantaneously.

const memoizedFactorial = memoize(factorial)
console.log(memoizedFactorial(17)); // slow
console.log(memoizedFactorial(17)); // faster
*/

function memoize(factorialFunction){
  let cache = {};
  return (num) => {
    if(!(num in cache)){
      let ans = factorialFunction(num);
      cache[num] = ans;
    }
    return cache[num];
  }
}

let factorial = (num) => {
  return num<=1? 1 :
    num * memoizedFactorial(num-1) ;
}

const memoizedFactorial = memoize(factorial)
console.log(memoizedFactorial(16)); // slow
console.log(memoizedFactorial(17)); // faster

/*
Implement function doSum which returns the sum of all the integers passed to it as arguments. Can be invoked like
const sumVal = doSum(1)(2)(3)();
console.log(sumVal) //6
*/


//const doSum = x=> y => z => () => x+y+z;

const doSum = x => 
(
  y =>
  (
    z=>
    (
      ()=>
      (
        x + y + z
      )
    )
  )
);

const sumVal = doSum(1)(2)(3)();
console.log(sumVal) //6

/*
 Implement a function sumMeUp which takes a function as an argument   
function sumMeUp(fn) {
}
function sum(a,b,c) {
    return a+b+c;
}
You should be able to to invoke the function like below
var currySum = sumMeUp(sum);
console.log(currySum(1,3,5));
*/


function sumMeUp(func) {

  return function summing(...args) {
    if (args.length == func.length) {
      return func(...args);
    } 
    else {
      return function(...args2) {
        return summing.apply(this, [...args,...args2]);
      };
    }
  };
}

function sum(a,b,c){
  return a+b+c;
}

var currySum = sumMeUp(sum);
console.log(currySum(1,3,5));
console.log(currySum(2)(3,5));
console.log(currySum(1)(2)(3));
