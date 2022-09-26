var seats = []; //sēdvietu masīvs
var seats_occupied = []; //jau aizņemtās sēdvietas
var tickets = []; // nopirktās biļetes
const seat_rows = 10; //sēdvietu rindu skaits
const seat_seats = 10; //sēdvietas rindā
const seats_total = (seat_seats * seat_rows); // kopējais sēdvietu skaits
const seats_occupied_total = Math.floor(Math.random() * (seats_total + 1)) ; //jau aizņemto sēdvietu skaits
var seats_selected = JSON.parse(localStorage.getItem('selectedSeats')); // no web storage paņem datus ar jau aizņemtām vietām
const movieid = 1;
const ticketPrice = 10; // filmas biļetes cena

// const selectedSeatsCount = selectedSeats.length;
 //const seats_occupied_total = 10 ;
// console.log("total occupied " + seats_occupied_total);
// console.log("total seats " + seats_total);
console.log("1 :" + seats_selected);

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
  
      xxx.push(Number(temp_string.splice(id_todel,1)));  
  } 
   console.log("seats_not_occupied");
   console.log(temp_string);
   return xxx;
}

function checkout(){ //pāriet pie apmaksas
  
  if (seats_selected.length == 0) { //nav izvēlētas vietas
    alert("Choose seats to proceed Checkout");
  }else{
    checkout_tmp = [];
    seats_selected.forEach((seat_id) =>{
      checkout_tmp.push([movieid,
                    seat_id,
                    seats[seat_id].at(0),
                    seats[seat_id].at(1),
                    ticketPrice]);
    })
    location.href = "checkout.html"
    localStorage.setItem('checkout', JSON.stringify(checkout_tmp)); //ieraksta checkout saglabāto iekš storage
  }
  
 // window.location.replace(".checkout.html");
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
  seats.forEach((seat,current_id) => { //izveido zāli ar random
    if (seats_selected !== null && seats_selected.includes(current_id) ){  // izvēlētās sēdvietas
      div_row.insertAdjacentHTML("beforeend", "<div class='seat selected' title='"+ seat.at(0) +".row, "+ seat.at(1) +". seat id="+current_id + "' id ='"+current_id+"'+></div>"); 
    }else if(seats_occupied.includes(current_id)){ //aizņemtās sēdvietas
      div_row.insertAdjacentHTML("beforeend", "<div class='seat occupied' title='"+ seat.at(0) +".row, "+ seat.at(1) +". seat id="+current_id + "' id ='"+current_id+"'+></div>");
    }else{ // pārējās sēdvietas
     div_row.insertAdjacentHTML("beforeend", "<div class='seat' title='"+ seat.at(0) +".row, "+ seat.at(1) +". seat id="+current_id + "' id ='"+current_id+"'+></div>"); 
    };
    if (i < seat_seats){  //skaita krēslus rindā, ja sasniegts skaits veido jaunu rindu
      i++;
    }
    else if ((seats.length-1) > current_id) // ja ir pēdējais ieraksts nepievienot jaunu sēdvietu rindu
    { i = 1;
      div_kino.insertAdjacentHTML("beforeend", "<div class='row' id='row'></div>"); 
      div_row = div_kino.lastElementChild;
    }  
  });


const container = document.querySelector('.container'); // dati no container bloka (krēsli)

container.addEventListener('click', e => {  // Seat click event Viss kas ir <div class="container"></div>
  if (
    e.target.classList.contains('seat') 
     && !e.target.classList.contains('occupied')
  ) {
    console.log("Class " + e.target.classList);
    if (seats_selected !== null && seats_selected.includes(Number(e.target.id)) && e.target.classList.contains('selected') )
       { // ja nonem selected tad izdzes no seat_selected masiva
        console.log(seats_selected.indexOf(Number(e.target.id)));
        seats_selected.splice(seats_selected.indexOf(Number(e.target.id)),1);
      }
    else if (seats_selected == null){ //ja ir pirmais ieraksts tukšā masīvā
      seats_selected = [Number(e.target.id)]
      }
    else{ // izvelas seat, tad pievieno
      seats_selected.push(Number(e.target.id));
    };
    
    e.target.classList.toggle('selected'); // nomaina status selected on/off

    //saglabā selected seats datus
    console.log("seats_selected " + seats_selected);
    localStorage.setItem('selectedSeats', JSON.stringify(seats_selected));
    count.innerText = seats_selected.length;
    total.innerText = seats_selected.length * ticketPrice;
  };
});

if (seats_selected !== null){
count.innerText = seats_selected.length;
total.innerText = seats_selected.length * ticketPrice;
}
// console.log("2 :" + seats_selected);