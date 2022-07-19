// Objekta definēšana literāļa palīdzību
var text = "";
const alus = {
  tips: "Light",
  stiprums: 7,
  tilpums: 0.5,
  cena: 1,
  
  //promt_value : prompt("Cik daudz?"),
  labs_alus: function () {
    text = text + "teksts ";    
    document.getElementById("test").innerHTML = text;
    if (this.stiprums * this.tilpums < 8) 
      {return "Var stūrēt auto";} 
      else {return "Jāiet kājām";}
     }
  

};

text = text + "Alus tips: " + alus.tips + "<BR>";
text = text + "Alus stiprums: " + alus.stiprums + "%<BR>";
text = text + "Alus tilpums: " + alus.tilpums + "litri<BR>";
text = text + `ko darīt: ${alus.labs_alus()}  sssss` ;
document.getElementById("test").innerHTML = text;

   

// let prompt_value = prompt("Enter country name:");

// function EU_country_find(value, index, array) {
//   console.log(prompt_value);
//   console.log(value);
//   return value == prompt_value;}

// const EU = {
//   countries: ["Latvija", "Lietuva", "Cehija"],
//   // prompt_value: prompt("Enter country name:"),
// /*  EU_country_find: function (value, index, array) {
//     // console.log(this.prompt_value);
//     console.log(prompt_value);
//     console.log(value);
//     // return value == this.prompt_value;},
//     return value == prompt_value;},*/
//   EU_classification: function () {
//     // return this.countries.find(this.EU_country_find) == undefined ? "Not EU" : "EU";
//     return this.countries.find(EU_country_find) == undefined ? "Not EU" : "EU";
//   },
// };