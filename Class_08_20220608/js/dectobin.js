var decim = 88,
  binars = "";
rezultats = String(binars);
masivs = [];
masiva_rez = "";

document.getElementById("skaitlis_").innerHTML = decim;
document.getElementById("parbaude_").innerHTML = decim.toString(2);
console.log("Pārbaude  " + decim.toString(2));

//*  console.log(i);
//*  console.log(decim, (binars = decim - 2 * (decim >> 1)), (decim = decim >> 1));


for (let i = 8; i > 0; i--) {
  binars = decim - 2 * (decim >> 1);
  decim = decim >> 1;
  masivs[i] = binars;
  }

console.log("Masīva garums = " + masivs.length);

for (let i = 1; i < masivs.length; i++) {
  console.log(i + ". masīva elements=" + masivs[i]);
  masiva_rez = masiva_rez + masivs[i];
}

console.log("Masīva rezultāts(BIN) = " + masivs.join(''));

//*console.log("Masīva rezultāts(BIN) = " + masiva_rez);
//* rezultats = String(binars) + rezultats;
//* console.log(rezultats);

document.getElementById("rezultats_").innerHTML = masiva_rez;
