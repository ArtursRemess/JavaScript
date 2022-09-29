var seats = []; //sēdvietu masīvs
var seats_occupied = []; //jau aizņemtās sēdvietas
var tickets = []; // nopirktās biļetes
var seats_selected = JSON.parse(localStorage.getItem('selectedSeats')); // no web storage paņem datus ar jau aizņemtām vietām
const movies = JSON.parse(localStorage.getItem('movies')); // visas filmas
var checkout = JSON.parse(localStorage.getItem('checkout')); //pagaidu izvēle
var order = JSON.parse(localStorage.getItem('order')); // visas pasūtītās sēdvietas
const div_kino = document.getElementById('kino'); // div sēdvietu zāle


const seat_rows = 10; //sēdvietu rindu skaits
const seat_seats = 10; //sēdvietas rindā
const seats_total = (seat_seats * seat_rows); // kopējais sēdvietu skaits
const seats_occupied_total = Math.floor(Math.random() * (seats_total + 1)) ; //jau Random aizņemto sēdvietu skaits

for (let i = 1; i < seat_rows+1; i++)  // izveido masīvu ar sēdvietu numuru sarakstu
{
  for (let j = 1; j < seat_seats+1; j++)
  {
    seats.push([i,j]);
  }
}


let params = new URLSearchParams(document.location.search); // dati no query string
const movieid = Number(params.get("id"));
// dati par filmu
const ticketPrice = movies[movieid].at(1); // filmas biļetes cena

function movie_list(){
  i = 0;
  movies.forEach((movie,movie_index) => {
    i++;
    div_kino.insertAdjacentHTML("beforeend", "<span class='poster' ><a href='film.html?id=" + movie_index + "'><img height='330' src= './poster/"+ movies[movie_index].at(3)+ "' alt='Poster'><h5>" + movies[movie_index].at(2) + "</h5></a></span>");
    if (i == 3){ // pēc 3 filmām jauna rinda
      div_kino.insertAdjacentHTML("beforeend", "<br>");
        i = 0;
    }
  });
}

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
   return xxx;
}

function create_html_left_top(){
  document.getElementById('poster').insertAdjacentHTML("afterbegin", "<img src= './poster/"+ movies[movieid].at(3)+ "' alt='Poster'>"); 
  document.getElementById('ticket_price').innerText = "Movie price " + (ticketPrice) + " EUR"; 
  document.getElementById('cast').innerText = (movies[movieid].at(4)); 
  document.getElementById('description').innerText = (movies[movieid].at(5)); 
  document.getElementById('movie_name').innerText = (movies[movieid].at(2));

  document.getElementById('_youtube').insertAdjacentHTML("afterbegin", "<iframe width='358px' height='200px' src='https://www.youtube.com/embed/" + (movies[movieid].at(6)) +"?autoplay=1&mute=1&loop=1&controls=0'></iframe>"); 
  create_kino_seats();
}

function create_kino_seats(){
  // document.getElementById('checkout').reset();
  // document.getElementById('showcase').reset();
  order = JSON.parse(localStorage.getItem('order')); // visas pasūtītās sēdvietas
  if (!order) {order=[]}
  div_kino.innerHTML='';
  if (order){ // atlasa esošās filmas nopirktās vietas, ja order nav tukšs
    order.forEach((seat_id) => {
      if (movieid == seat_id.at(0)) {
        tickets.push(seat_id.at(1));
      }
    });
  }

  seats_occupied = create_random_seats(seats_total, seats_occupied_total);
  
  div_kino.insertAdjacentHTML("beforeend", "<div class='row' id='row'></div>"); // izveido 1.rindu
  var div_row = div_kino.lastElementChild; // atlasa pēdējo child no "kino"
  i = 1;
  seats.forEach((seat,current_id) => { //izveido zāli ar random
    if (seats_selected !== null && seats_selected.includes(current_id) ){  // izvēlētās sēdvietas
      div_row.insertAdjacentHTML("beforeend", "<div class='seat selected' title='"+ seat.at(0) +".row, "+ seat.at(1) +". seat id="+current_id + "' id ='"+current_id+"'+></div>"); 
    }else if(tickets.includes(current_id)){ //nopirktās sēdvietas 
      div_row.insertAdjacentHTML("beforeend", "<div class='seat bought' title='"+ seat.at(0) +".row, "+ seat.at(1) +". seat id="+current_id + "' id ='"+current_id+"'+></div>");
    }else if(seats_occupied.includes(current_id)){ //random aizņemtās sēdvietas 
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
     && !e.target.classList.contains('bought')
  ) {
    if (seats_selected !== null && seats_selected.includes(Number(e.target.id)) && e.target.classList.contains('selected') )
       { // ja nonem selected tad izdzes no seat_selected masiva
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
    localStorage.setItem('selectedSeats', JSON.stringify(seats_selected));
    count.innerText = seats_selected.length;
    total.innerText = seats_selected.length * ticketPrice;
    };
  });
  
  if (seats_selected !== null){
    count.innerText = seats_selected.length;
    total.innerText = seats_selected.length * ticketPrice;
    }
}

function rate_stars() {  /* zvaigznes */
 // document.getElementById('demo').innerText = document.querySelector('input[name="rate"]:checked').id;
 // let stars_count = Number(document.querySelector('input[name="rate"]:checked').value);
  const div_star = document.getElementById('stars').innerHTML;
  div_star.addEventListener('click', e => {
  alert(click);
    /*
    let stars_count=3;
  let stars='';
  for (let i = 1; i < 6; i++) {
      if (i <= stars_count) {stars += '<span class="fa fa-star checked"></span>'} 
      else {stars += '<span class="fa fa-star"></span>'};
      */
  });
  document.getElementById('stars').innerHTML=stars;
};






function checkout_submit(){ //pāriet pie apmaksas no
  if (!seats_selected || seats_selected.length == 0) { //nav izvēlētas vietas
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
        localStorage.setItem('checkout', JSON.stringify(checkout_tmp)); //ieraksta checkout saglabāto iekš storage
        document.getElementById('checkout').remove()
        document.getElementById('showcase').remove()
        chekout_ticket_list()
  }
}

function chekout_ticket_list(){ //bilesu saraksts
  var checkout = JSON.parse(localStorage.getItem('checkout'));
  div_kino.innerHTML='';
  i=0;
  price_total = 0;
  checkout.forEach((checkout_tickets,checkout_id) => { 
  i++;
  div_kino.insertAdjacentHTML("beforeend", "<div id='" + checkout_id + "'>"+ i +". &nbsp; &nbsp;" 
          + checkout_tickets.at(2) + ".row  &nbsp; &nbsp;" 
          + checkout_tickets.at(3) + ".seat &nbsp; &nbsp;"
          + "price:&nbsp;" + checkout_tickets.at(4) + "&nbsp; EUR &nbsp;" 
          + "<img class='_remove' onclick='checkout_remove_from_list(" + checkout_id + ")' src='./img/remove.png' style='width:15px;height:15px;' alt='Remove'>"
          + "</div><br>"); 
          price_total = price_total + checkout_tickets.at(4);
  });
  div_kino.insertAdjacentHTML("beforeend","<div>--------------------------------------------------</div>" 
    + "<div id='total' style='font-weight: bold'>Tickets total (" + i + ")   Price total = " + price_total + " EUR</div>" 
    + "<br><b>Card payment</b><br><br>" 
    + "Name on card <input type='text' id='name' value='John Doe'><br><br>" 
    + "Card number <input type='text' value='1234567890'><br><br>" 
    + "CVC <input size='3' type='text' value='123'><br><br>" 
    + "<span><button id='buy_buton' onclick='buynow()'>Pay Now</button>" 
    + "<button onclick='window.location.reload()'>Back</button></span>");

}

function checkout_remove_from_list(id){ // izdzēš ierakstu in DOM elementu
  checkout = JSON.parse(localStorage.getItem('checkout'));
  console.log(checkout);
  checkout.splice(Number(id),1); // izņem no array
  document.getElementById(id.toString()).remove();  // dzēš <div> elementu
  localStorage.setItem('checkout', JSON.stringify(checkout));
  console.table(checkout);
  if (!checkout || checkout.length == 0) {
    document.getElementById('buy_buton').remove();
    };
  chekout_ticket_list();
}

function buynow(){
  checkout = JSON.parse(localStorage.getItem('checkout'));
  var _name = document.getElementById('name').value;
   checkout.forEach((elem,index) => { //pārnes datus uz chekout uz order movie_id, seat_id, row, seat, ticketprice
       checkout[index].push(_name);  // pievieno vārdu katrai biļetei
       order.push((checkout[index])); 
       
   });
   localStorage.setItem('order', JSON.stringify(order)); // saglabā orders
   localStorage.removeItem('checkout'); // dzēš pagaidu grozu
   localStorage.removeItem('selectedSeats'); // dzēš atlasītās sēdvietas
   alert("Thank You! For purchase");
   location.reload();
}
