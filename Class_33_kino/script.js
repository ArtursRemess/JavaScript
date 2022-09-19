var seats = []; //sēdvietu masīvs
var seats_occupied = []; //aizņemtās sēdvietas
const seat_rows = 4; //sēdvietu rindu skaits
const seat_seats = 8; //sēdvietas rindā
const seats_total = (seat_seats * seat_rows); // kopējais sēdvietu skaits
const seats_occupied_total = Math.floor(Math.random() * (seats_total + 1)) ; //aizņemto sēdvietu skaits
//const seats_occupied_total = 10 ;
console.log("total occupied " + seats_occupied_total);
console.log("total seats " + seats_total);


function create_random_seats(seats_total, seats_occupied_total){ //izveido masīvu ar aizņemtajiem krēsliem
  var temp_string=[];
  for (let i = 0; i < seats_total; i++)  // izveido pagaidu rindu ar masīva indexiem
  { 
    temp_string.push(i) ;
  }
  let id_todel=0;
  let xxx = [];
  for (let i = 0; i < seats_occupied_total; i++){  // izvēlas gadījuma ierakstus un pārnes jaunajā masīvā
      id_todel=(Math.floor(Math.random() * (temp_string.length)));
  //    console.log("id_todel= " + id_todel + " temp_string.at(id_todel) " + temp_string.at(id_todel) + "  tmp_lenth= " + temp_string.length);
      xxx.push(Number(temp_string.splice(id_todel,1)));  
  } 
   console.log("seats_not_occupied");
   console.log(temp_string);
   return xxx;
}

for (let i = 1; i < seat_rows+1; i++)  // izveido masīvu ar sēdvietu numuru sarakstu
  {
    for (let j = 1; j < seat_seats+1; j++)
    {
      seats.push([i,j]);
    }
  }

 seats_occupied = create_random_seats(seats_total, seats_occupied_total);
 console.log("seats_occupied");
 console.log(seats_occupied);

  const div_kino = document.getElementById('kino'); //sēdvietu zāle
  div_kino.insertAdjacentHTML("beforeend", "<div class='row' id='row'></div>"); // izveido 1.rindu
  var div_row = div_kino.lastElementChild; // atlasa pēdējo child no "kino"
  i = 1;
  seats.forEach((seat,current_id) => {
    if (seats_occupied.includes(current_id)){  //ja aiņemts tad
      div_row.insertAdjacentHTML("beforeend", "<div class='seat occupied' title='seat id="+current_id+"'></div>");
    }else{
     div_row.insertAdjacentHTML("beforeend", "<div class='seat' title='"+ seat.at(0) +".row, "+ seat.at(1) +". seat id="+current_id+"'></div>");
    };
    if (i < seat_seats){  //skaita krēslus rindā, ja sasniegts skaits veido jaunu rindu
      i++;
    }
    else if ((seats.length-1) > current_id) // ja ir pēdējais ieraksts nepievienot jaunu sedvitu rindu
    { i = 1;
      div_kino.insertAdjacentHTML("beforeend", "<div class='row' id='row'></div>"); 
      div_row = div_kino.lastElementChild;
    }  
  });

 // console.table(seats);

 const container = document.querySelector('.container'); // dati no container bloka (krēsli)

 const seats_obj = document.querySelectorAll('.row .seat:not(.occupied)'); //saņem datus par krēsliem, izņemot VIP sēdvietas

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

  const seatsIndex = [...selectedSeats].map(seat => [...seats_obj].indexOf(seat));
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
    seats_obj.forEach((seat, index) => {
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
