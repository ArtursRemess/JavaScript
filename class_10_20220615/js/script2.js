// aatēlot summu ar divām .00 (1.00, 1.20)
// procentu izmaksa notiek termiņa beigās
//masivs peļnas iegūšanai

var vards_uzvards = "Jānis Bērziņš,";
var nauda = 15000;
var pelnja_gada = null;
var pelnja = [];
var teksts = "";

for (let gadi = 1; gadi < 6; gadi++) {
  pelnja_gada = 0;
  for (let i = 0; i < gadi; i++) {
    pelnja_gada = pelnja_gada + ((pelnja_gada + nauda) * (gadi/100));
    console.log((i+1) + ". gadi " + pelnja_gada);
  }
  pelnja[(gadi - 1)] = pelnja_gada;
  teksts = teksts + gadi + ".gadi peļņa būs " + pelnja[(gadi - 1)].toFixed(2) + " EUR(Gada proc. likme "+ gadi+"%)<BR>";
}

document.getElementById("client").innerHTML = vards_uzvards;
document.getElementById("money").innerHTML = nauda;
document.getElementById("procenti_1").innerHTML = teksts;
