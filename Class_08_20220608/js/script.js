var xo = 45,
    y = null,
    z = String(y),
    binars = 0;
    rezultats = String(binars);
document.getElementById("dec").innerHTML = xo;

y = (xo << 0) >> 7;
z = z + String(y);
y = (xo << 1) >> 7;
z = z + String(y);
y = (xo << 2) >> 7;
z = z + String(y);
y = (xo << 3) >> 7;
z = z + String(y);
y = (xo << 4) >> 7;
z = z + String(y);
y = (xo << 5) >> 7;
z = z + String(y);
y = (xo << 6) >> 7;
z = z + String(y)

console.log(z);
console.log('ŗezulttats');

console.log('pārbaude  ' + xo.toString(2));

console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=rezultats+String(binars);
console.log(rezultats);


 a = 45;
//
console.log("a=" + a);
a++;
console.log("a++=" + a);
++a;
console.log("++a=" + a);
a = a + a;
console.log("a=a+a ir" + a);
var b = 10;
console.log("b=" + b);
b = 100;
console.log("b=100 ir " + b);
const c = 1000;
console.log("const c=1000 ir " + c);
// let b = 3
// c=12

var d = 45;

console.log("d vertiba (no  galvena zara) " + d);

{
  console.log("d vertiba (no scope) nodalāms ar šādām iekavām {} " + d);
  var d = 46;
  console.log("d vertiba pēc pārdefinēšanas (no scope) " + d);
}

console.log("d vertiba (no  galvena zara) pēc scope " + d);

let e = 75;

console.log("e vertiba (no  galvena zara) " + e);

{
  // console.log('e vertiba (no scope) nodalāms ar šādām iekavām {} '+e);
  let e = 100;
  console.log("e vertiba pēc pārdefinēšanas (no scope) " + e);
}
console.log("e vertiba (no  galvena zara) pēc scope " + e  );



const f =111 ;

console.log("f vertiba (no  galvena zara) " + f);

{
   // console.log("f vertiba (no scope) nodalāms ar šādām iekavām {} " + f);
  const f = 100;
  console.log("f vertiba pēc pārdefinēšanas (no scope)" + f);
}

console.log("f vertiba (no  galvena zara) pēc scope " + f);




//document.getElementById("demo").innerHTML = 456 || 0;

//function myFunction() {
//    document.getElementById("kuku").innerHTML = typeof(456||0);
//  }
