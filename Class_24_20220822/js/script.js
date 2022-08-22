var text = "Jā",
  links = "https://spoki.lv",
  logatips = "Jā";

text = prompt("Pāriet uz citu lapu?", text);
document.getElementById("demo").innerHTML = text;
if (text == "Jā") {
  links = prompt("Kādu interneta adresi?", links);
  document.getElementById("demo2").innerHTML = links;
  logatips = prompt("Atvērt jaunā lapā", logatips);
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
