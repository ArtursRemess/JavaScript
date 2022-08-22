// https://www.stenders-cosmetics.com/media/js/63b8a1f2d015dcf612efbb6b330d5c27.js
// ----- call()---------

var  _toString = Object.prototype.toString; //no stenders-cosmetics
// var value=["Audi","80","Diesel"];
 var value=new Date();
// var value={firstName: "John", lastName: "Doe" };
// var value="aaa";

console.log(`vērtība: ${value}`);
var _class = _toString.call(value); //no stenders-cosmetics
console.log(`tips: ${_class}`);

// ----- bind()---------

 var method = value ;  //no stenders-cosmetics
// value.toString = method.toString.bind(method);
value.valueOf = method.valueOf.bind(method); //no stenders-cosmetics
value.toString = method.toString.bind(method); //no stenders-cosmetics

console.log(`----bind()-----`);
console.log(`value.valueOf: ${value.valueOf()}`);
console.log(`value.toString: ${value.toString()}`);


