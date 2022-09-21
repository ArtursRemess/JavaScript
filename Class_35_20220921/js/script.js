
const _name = document.getElementById('_name');

console.log(_name);
console.log(_name.value);
console.log(_name.id);
var language=[];


function save_cv(){
  // const div_cv = document.getElementById('div_cv');
  // console.log(document.getElementById('_name').value);
  console.log(document.getElementById('language').value);
  console.log('language_level: ' + document.querySelector('input[name="language_level"]:checked').value);

}

function add_language(){
  const div_language = document.getElementById('div_language');
  div_language.insertAdjacentHTML("afterbegin", "<br><div>" 
          + document.getElementById('language').value + "  : " 
          + document.querySelector('input[name="language_level"]:checked').value + "</div>");

  language.push([document.getElementById('language').value, document.querySelector('input[name="language_level"]:checked').value]);
// document.getElementById('language').value;
// document.querySelector('input[name="language_level"]:checked').value;
 console.table(language);
}


  
  
  // console.log(div_cv);
  // console.log(Object.values(div_cv));


