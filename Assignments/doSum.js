/*
Implement function doSum which returns the sum of all the integers passed to it as arguments. Can be invoked like
const sumVal = doSum(1)(2)(3)();
console.log(sumVal) //6
*/


//const doSum = x=> y => z => () => x+y+z;

// const doSum = x => 
// (
//   y =>
//   (
//     z=>
//     (
//       ()=>
//       (
//         x + y + z
//       )
//     )
//   )
// );



function doSum(a){
    return b => {
        return (b===undefined?a:doSum(a+b));
    }
}
const sumVal = doSum(1)(2)(3)();
console.log(sumVal) //6

