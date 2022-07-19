// Objekta definēšana literāļa palīdzību
var text = " texts";
let grades = [45, 4, 9, 16, 25];
var search= [6];
const result= grades.filter(searchgrade);


function searchgrade(value, index, array) {
  return value == search[0];
};

document.getElementById("test").innerHTML = result;
