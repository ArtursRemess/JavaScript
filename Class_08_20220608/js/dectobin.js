var xo = 53,
    y = null,
    z = String(y),
    binars = 0;
    rezultats = String(binars);

document.getElementById("skaitlis_").innerHTML = xo;

document.getElementById("parbaude_").innerHTML = xo.toString(2);
console.log('pārbaude  ' + xo.toString(2));


console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(xo,binars=xo-(2*(xo>>1)),xo=xo>>1);
rezultats=String(binars)+rezultats;
console.log(rezultats);

document.getElementById("rezultats_").innerHTML = rezultats;