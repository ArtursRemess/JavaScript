function load_data(){

var language = [];
var education = [];
var job=[];


document.getElementById('_name').innerHTML = localStorage.getItem('_name');
document.getElementById('surname').innerHTML = localStorage.getItem('surname');
document.getElementById('occupation').innerHTML = localStorage.getItem('occupation');
document.getElementById('salary').innerHTML = localStorage.getItem('salary');
document.getElementById('other_info').innerHTML = JSON.parse(localStorage.getItem('other_info'));

}


