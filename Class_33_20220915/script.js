﻿const container = document.querySelector('.container'); // dati no container bloka (krēsli)

const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //saņem datus par krēsliem, izņemot VIP sēdvietas

const count = document.getElementById('count'); 
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// # 1 izvieto atzīmētos klientus
populateUI();  

//# 2 Piešķir cenu pēc izvēles no HTML paņem datus
let ticketPrice = +movieSelect.value;
console.log(ticketPrice);



// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  // atlasa atzīmētos krēslus
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  console.log("Seats index " );
  console.log(seatsIndex);
// saglabā web storage.   JSON.stringify Pārveido masīvu datos ku var saglabāt
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // aizņemto krēslu daudzums
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
// JSON.parse Pārveido atkodē datus un pārvērš masīvā
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
// no web storage paņem datus ar jau aizņemtām vietām
console.log(selectedSeats);
// ja nav izvēlēti krēsli
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
 // ja atrod masīvā šadu numuru       
      if (selectedSeats.indexOf(index) > -1) {
// Ja ir aizņemts
        seat.classList.add('selected');
      }
    });
  }


 // # 3 
 // paņem filmas nosaukumu no storage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
// izvēlas kura izvēlēta
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
// #4 ja izmainas FILMAS nosaukums(klausās izmaiņas)
// Movie select event <select id="movie">
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
// funkcija saglabā datus par filmu storage
  setMovieData(e.target.selectedIndex, e.target.value);
// saglabā datus par sēdvietām  
  updateSelectedCount();
});

// Seat click event
// Viss kas ir <div class="container"></div>
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
