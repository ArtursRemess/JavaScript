var moviename = document.getElementById('moviename');
var div_tickets = document.getElementById('tickets');


// checkout structure: movie_id, seatid, row, seat, ticekt_price
var checkout = JSON.parse(localStorage.getItem('checkout'));
var order = JSON.parse(localStorage.getItem('order'));
if (!order) {order=[]}

moviename.innerText = '1';

var i = 0;
var price_total = 0; 
function ticket_list(){
    checkout.forEach((checkout_tickets,checkout_id) => { 
    i++
    div_tickets.insertAdjacentHTML("beforeend", "<div id='" + checkout_id + "'>"+ i +". &nbsp; &nbsp;" 
            + checkout_tickets.at(2) + ".row  &nbsp; &nbsp;" 
            + checkout_tickets.at(3) + ".seat &nbsp; &nbsp;"
            + "price:&nbsp;" + checkout_tickets.at(4) + "&nbsp; EUR &nbsp;" 
            + "<img class='_remove' onclick='remove_from_list(" + checkout_id + ")' src='./img/remove.png' style='width:15px;height:15px;' alt='Remove'>"
            + "</div><br>"); 
            price_total = price_total + checkout_tickets.at(4);
    });
    
}

function remove_from_list(id){ // izdzēš ierakstu in DOM elementu
    checkout.splice(Number(id),1); // izņem no array
    document.getElementById(id.toString()).remove();  // dzēš <div> elementu
    localStorage.setItem('checkout', JSON.stringify(checkout));
    location.reload();
}

function buynow(){
   // console.log(checkout.slice(0,length.checkout));
   
   var _name = document.getElementById('name').value;
   let _url_to_return = "film.html?id="
    checkout.forEach((elem,index) => { //pārnes datus uz chekout uz order movie_id, seat_id, row, seat, ticketprice
        checkout[index].push(_name);  // pievieno vārdu katrai biļetei
        _url_to_return = "film.html?id=" + checkout[index].at(0);
        order.push((checkout[index])); 
        
    })
    localStorage.setItem('order', JSON.stringify(order)); // saglabā orders
    localStorage.removeItem('checkout'); // dzēš pagaidu grozu
    localStorage.removeItem('selectedSeats'); // dzēš atlasītās sēdvietas
    alert("Thank You! For purchase");
    location.href = _url_to_return;
}
ticket_list();
document.getElementById('total').innerText ="Tickets total (" + i + ")   Price total = " + price_total + " EUR";



