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