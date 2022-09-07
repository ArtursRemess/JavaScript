// create a new div and set its attributes
let div = document.createElement('div');
div.id = 'content';
div.className = 'note';
let text = document.createTextNode('CreateElement example');
div.appendChild(text);
document.body.appendChild(div);



const menu = document.querySelector('#menu');

let li = document.createElement('li');
li.textContent = 'Products';
menu.appendChild(li);

li = document.createElement('li');
li.textContent = 'About Us';

// select the ul menu element

menu.appendChild(li);

let note = document.getElementById('main');
console.log(note.textContent);