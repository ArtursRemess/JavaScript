let params = new URLSearchParams(document.location.search);
const movieid = Number(params.get("id"));
const order = JSON.parse(localStorage.getItem('order')); // visas pasūtītās sēdvietas


if (order){ // atlasa esošās filmas nopirktās vietas, ja order nav tukšs
    order.forEach((ticket) => {
      if (movieid == ticket.at(0)) {

        
        
      }
    });
  }

  
