var moviename = document.getElementById('moviename');
var div_tickets = document.getElementById('tickets');
var order=[];

// checkout structure: movie_id, seatid, row, seat, ticekt_price
var checkout = JSON.parse(localStorage.getItem('checkout'));

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
    console.log(checkout.slice(0,length.checkout));
    console.log(document.getElementById('name').value);
 
    checkout.forEach((elem,index) => { //pārnes datus uz chekout uz order
        checkout[index].push('John Doe');
        order.push((checkout[index])); 
        console.log(order);
        localStorage.setItem('order', JSON.stringify(order));
        
    })
}
ticket_list();
document.getElementById('total').innerText ="Tickets total (" + i + ")   Price total = " + price_total + " EUR";



