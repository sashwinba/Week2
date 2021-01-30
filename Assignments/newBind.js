/*
newBind should work same as bind does with a function
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
