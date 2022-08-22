

var text = "Jā",
  links = "https://spoki.lv",
  logatips = "Jā";

text = confirm("Pāriet uz citu lapu?" );
document.getElementById("demo").innerHTML = text;
if (text == true) {
  links = prompt("Kādu interneta adresi?", links);
  document.getElementById("demo2").innerHTML = links;
  logatips = prompt("Atvērt jaunā lapā", logatips);

  var count = 0;
  var el = document.getElementById('seconds');
  
  function timer() {
  count += 1;
  el.innerText = "Palika" + count + "sekundes.";
  }
  var cancel = setInterval(timer, 1000);
    
  
  if (logatips == null) {
    setTimeout(() => {
      window.open(links, "_self");
    }, 5000);
    
    } else {
      setTimeout(() => {
      window.open(links, "_blank");
    }, 5000);
  }
}


