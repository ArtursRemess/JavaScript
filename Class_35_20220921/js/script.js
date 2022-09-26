

var language = [];
var education = [];
var job=[];

document.getElementById('_name').value = localStorage.getItem('_name');
document.getElementById('surname').value = localStorage.getItem('surname');
document.getElementById('occupation').value = localStorage.getItem('occupation');
document.getElementById('salary').value = localStorage.getItem('salary');
document.getElementById('other_info').value = JSON.parse(localStorage.getItem('other_info'));

function save_cv(){
  const _name = document.getElementById('_name').value;
  const surname = document.getElementById('surname').value;
  const occupation = document.getElementById('occupation').value;
  const salary = document.getElementById('salary').value;
  const other_info = document.getElementById('other_info').value;
  const education_date = document.getElementById('education_date').value;
  const education_month = document.getElementById('education_month').value;
  const education_txt = document.getElementById('education').value;
  const job_history_date = document.getElementById('job_history_date').value;
  const job_history_month = document.getElementById('job_history_month').value;
  const job_history = document.getElementById('job_history').value;

  education.push([education_date,education_month,education_txt]);
  job.push([job_history_date,job_history_month,job_history]);
  language.push([document.getElementById('language').value, document.querySelector('input[name="language_level"]:checked').value]);

  localStorage.setItem('_name', _name);
  localStorage.setItem('surname', surname);
  localStorage.setItem('occupation', occupation);
  localStorage.setItem('salary', salary);
  localStorage.setItem('other_info', JSON.stringify(other_info));
  localStorage.setItem('education', JSON.stringify(education));
  localStorage.setItem('job', JSON.stringify(job));
  localStorage.setItem('language', JSON.stringify(language));

  
  
  
//  console.log(document.getElementById('language').value);
//  console.log('language_level: ' + document.querySelector('input[name="language_level"]:checked').value);
}

function add_education(){
    const div_education = document.getElementById('div_education');
    div_education.insertAdjacentHTML("afterbegin", "<br><div>" 
          + document.getElementById('education_date').value + "  : " 
         + document.getElementById('education_month').value + "  : " 
         + document.getElementById('education').value + "<a href=''>dzēst</a></div>");
         education.push([document.getElementById('education_date').value,document.getElementById('education_month').value,document.getElementById('education').value]);
}

function add_job_history(){
    const div_job_history = document.getElementById('div_job_history');
    div_job_history.insertAdjacentHTML("afterbegin", "<br><div>" 
          + document.getElementById('job_history_date').value + "  : " 
         + document.getElementById('job_history_month').value + "  : " 
         + document.getElementById('job_history').value + "</div>");
         job.push([document.getElementById('job_history_date').value,document.getElementById('job_history_month').value,document.getElementById('job_history').value]);
}

function add_language(){
  const div_language = document.getElementById('div_language');
  div_language.insertAdjacentHTML("afterbegin", "<br><div>" 
          + document.getElementById('language').value + "  : " 
          + document.querySelector('input[name="language_level"]:checked').value + "</div>");

  language.push([document.getElementById('language').value, document.querySelector('input[name="language_level"]:checked').value]);
 console.table(language);
}

function print_cv(){
  save_cv();
  location.href = "cvdb.html";
}

window.name = "original";
function OpenNewWindow(){
window.open(
  "./sign_up/signup.html",
  //"https://www.w3schools.com/js/js_object_prototypes.asp",
  "test",
  "height=500,width=500"
);
}


  // console.log(div_cv);
  // console.log(Object.values(div_cv));


