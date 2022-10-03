/* Cinema seats no https://vanillawebprojects.com/projects/movie-seat-booking/ */
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
let params = new URLSearchParams(document.location.search); // dati no query string
const movieid = Number(params.get("id"));
// current movie dati par tekošo filmu
const cmovie = {
    ticket_price : movies[movieid].at(1),
    movie_name : movies[movieid].at(2),
    poster : movies[movieid].at(3),
    cast : movies[movieid].at(4),
    description : movies[movieid].at(5),
    _youtube : movies[movieid].at(6)
  };

for (let i = 1; i < seat_rows+1; i++)  // izveido masīvu ar sēdvietu numuru sarakstu
{
  for (let j = 1; j < seat_seats+1; j++)
  {
    seats.push([i,j]);
  }
}

// pirmās lapas funkcija
function movie_list(){ 

  create_movie_list(); // ielādē datus

  localStorage.removeItem('selectedSeats');// dzēš izvēlētās sēdvietas
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

function create_html_left_top(){
  document.getElementById('poster').insertAdjacentHTML("afterbegin", "<a href='index.html'><img src= './poster/"+ cmovie.poster + "' alt='" + cmovie.movie_name + "'></a>"); 
  document.getElementById('ticket_price').innerText = "Movie price " + cmovie.ticket_price + " EUR"; 
  document.getElementById('cast').innerText = cmovie.cast; 
  document.getElementById('description').innerText = cmovie.description; 
  document.getElementById('movie_name').innerText = cmovie.movie_name;

  document.getElementById('_youtube').insertAdjacentHTML("afterbegin", "<iframe width='358px' height='200px' src='https://www.youtube.com/embed/" + (cmovie._youtube) +"?autoplay=1&mute=1&loop=1&controls=0'></iframe>"); 
  create_kino_seats();
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
      id_todel=(Math.floor(Math.random() * (temp_string.length))); // atrod gadījuma skaitli
      xxx.push(Number(temp_string.splice(id_todel,1)));  // pārnes gadījuma skaitļu masīvā
  } 
   return xxx;
}


function create_kino_seats(){
  order = JSON.parse(localStorage.getItem('order')); // visas pasūtītās sēdvietas
  if (!order) {order=[]}
  div_kino.innerHTML=''; 
  if (order){ // atlasa esošās filmas nopirktās vietas
    order.forEach((seat_id) => {
      if (movieid == seat_id.at(0)) {
        tickets.push(seat_id.at(1));
      }
    });
  }
  seats_occupied = create_random_seats(seats_total, seats_occupied_total);
  i = 1;
  j = 1;
  div_kino.insertAdjacentHTML("beforeend", "<div class='row' id='row'><font style='color:#242333'>0</font>" + j + ".</div>"); // izveido 1.rindu
  var div_row = div_kino.lastElementChild; // atlasa pēdējo child no "kino"
  seats.forEach((seat,current_id) => { //izveido zāli ar random
    if (seats_selected !== null && seats_selected.includes(current_id) ){  // izvēlētās sēdvietas
      div_row.insertAdjacentHTML("beforeend", "<div class='seat selected' title='"+ seat.at(0) +".row "+ seat.at(1) +".seat' id ='"+current_id+"'+></div>"); 
    }else if(tickets.includes(current_id)){ //nopirktās sēdvietas 
      div_row.insertAdjacentHTML("beforeend", "<div class='seat bought' title='"+ seat.at(0) +".row "+ seat.at(1) +".seat' id ='"+current_id+"'+></div>");
    }else if(seats_occupied.includes(current_id)){ //random aizņemtās sēdvietas 
      div_row.insertAdjacentHTML("beforeend", "<div class='seat occupied' title='"+ seat.at(0) +".row "+ seat.at(1) +".seat' id ='"+current_id+"'+></div>");
    }else{ // pārējās sēdvietas
     div_row.insertAdjacentHTML("beforeend", "<div class='seat' title='"+ seat.at(0) +".row "+ seat.at(1) +".seat' id ='"+current_id+"'+></div>"); 
    };
    if (i < seat_seats){  //skaita krēslus rindā, ja sasniegts skaits veido jaunu rindu
      i++;
    }
    else if ((seats.length-1) > current_id) // ja ir pēdējais ieraksts nepievienot jaunu sēdvietu rindu
    { i = 1;
      j++;
      if (j < 10) {
        div_kino.insertAdjacentHTML("beforeend", "<div class='row' id='row'><font style='color:#242333'>0</font>" + j + ".</div>"); 
        }
      else{
        div_kino.insertAdjacentHTML("beforeend", "<div class='row' id='row'>" + j + ".</div>"); 
      }
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
    total.innerText = seats_selected.length * cmovie.ticket_price;
    };
  });
  
  if (seats_selected !== null){
    count.innerText = seats_selected.length;
    total.innerText = seats_selected.length * cmovie.ticket_price;
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
                    cmovie.ticket_price]);
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

function create_movie_list(){ // active, movie_price, movie_name, poster_img, movie_cast, movie_desc, Youtube
  var movies = [];
  movies.push([1,10,"Minions","minions.jpg","Steve Carell ... Gru (voice)","The untold story of one twelve-year-old's dream to become the world's greatest supervillain.","6DxjJzmYsXo"]);
  movies.push([1,12,"The Batman","batman.jpg","Robert Pattinson	...	Bruce Wayne / The Batma","When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.","mqqft2x_Aa4"]);
  movies.push([1,8,"Naked Gun 33 1/3: The Final Insult","naked_gun.jpg","Leslie Nielsen	...	Lt. Frank Drebin","Frank Drebin (Leslie Nielsen) comes out of retirement to help Police Squad infiltrate a gang of terrorists planning to detonate a bomb at the Academy Awards.","SQaULBUqxMs"]);
  movies.push([1,14,"Fifty Shades of Grey","50.jpg","Dakota Johnson	...	Anastasia Steele","Literature student Anastasia Steele's life changes forever when she meets handsome, yet tormented, billionaire Christian Grey.","SfZWFDs0LxA"]);
  movies.push([1,9,"Dumb and Dumber To","dumb.jpg","Jim Carrey	...	Lloyd","20 years since their first adventure, Lloyd and Harry go on a road trip to find Harry's newly discovered daughter, who was given up for adoption.","dmNddThxi4c"]);
  movies.push([1,11,"The Hangover","hangover.jpg","Bradley Cooper	...	Phil","Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.","tcdUhdOlz9M"]);
  movies.push([1,7,"Saw","saw.jpg","Leigh Whannell	...	Adam Faulkner-Stanheight","Two strangers awaken in a room with no recollection of how they got there, and soon discover they're pawns in a deadly game perpetrated by a notorious serial killer.","OCZp5v8V-94"]);

  localStorage.setItem('movies', JSON.stringify(movies));
  console.log('movies');
  console.log(movies);
};