// https://www.javascripttutorial.net/javascript-dom/javascript-events/

 let btn = document.querySelector('#btn');

/*
function display() {
    alert('It was clicked!');
}
btn.addEventListener('click',display);
*/

/*
btn.addEventListener('click',function() {
    alert('It was clicked!');
});
*/
btn.addEventListener('keypress', (event) => {  //mouseover, mouseup,..
    console.log(event.keyCode);
//  alert('It was clicked!');
    console.log("Type: " + event.type);
    console.log("Bubbles: " + event.bubbles);
    console.log("Cancelable: " + event.cancelable);
    console.log("Current Target: ");
    console.log(event.currentTarget);
    console.log("Target: ");
    console.log(event.target);
//  event.currentTarget.innerText="Ouch";
    console.log("Default action prevented " + event.defaultPrevented);
    console.log("Cik daudz reizes nospiesta poga " + event.detail);
    console.log("Event phase " + event.eventPhase);
    event.preventDefault();
    console.log("Default action prevented after preventDefault() " + event.defaultPrevented);
});

// https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget

function hide(e){
  let currentTarget_ = e.currentTarget;
  //console.log(currentTarget_.tagName);
  if (currentTarget_.tagName == 'P')
      setTimeout(() => {currentTarget_.style.visibility = 'hidden';}, 1000);
  else
      setTimeout(() => {currentTarget_.style.visibility = 'hidden';}, 2000);

  e.stopPropagation();    
  console.log("e.currentTarget: ",e.currentTarget);
  console.log("e.target: ",e.target);
  // When this function is used as an event handler: this === e.currentTarget
}
const ps = document.getElementsByTagName('p');

for (let i = 0; i < ps.length; i++){
    // console: print the clicked <p> element
    ps[i].addEventListener('click', hide, false);
  }

//document.body.addEventListener('click', hide, false);


let link = document.querySelector('a');
link.addEventListener('click',function(event) {
    console.log('clicked');
    event.preventDefault();
    console.log(event.currentTarget.href);
    let jsWindow = window.open(
        event.currentTarget.href,
        //"https://www.w3schools.com/js/js_object_prototypes.asp",
        "test",
        "height=600,width=800"
      );
});



// // btn.addEventListener('mouseover', (event) => {
//   //  alert('It was clicked!');
//   btn.addEventListener('mouseup', (event) => {
//       console.log("Type: " + event.type);
//       console.log("Bubbles: " + event.bubbles);
//       console.log("Cancelable: " + event.cancelable);
//       console.log("Current Target: ");
//       console.log(event.currentTarget);
//   //  event.currentTarget.innerText="Ouch";
//       console.log("Default? " + event.defaultPrevented);
//       console.log("Cik daudz reizes nospiesta poga " + event.detail);
      
//   });