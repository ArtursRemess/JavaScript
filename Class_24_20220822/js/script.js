var text = "Jā",
  links = "https://iauto.lv",
  logatips = 1;
let i = 3;
function isUrl(s) {
  var regexp =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}

text = confirm("Pāriet uz citu lapu?");
if (text == true) {
  links = prompt("Uz kādu interneta adresi?", links);
  do {
      if (links === null) {break;}
      if (isUrl(links) == false) {links = prompt("Nekorekta interneta adrese (atlikuši " + i + "  mēģinājumi)",links);}
      i -= 1;
      if (i == 0) {break;}
  } while (isUrl(links) == false);
  if (isUrl(links) == true){
      logatips = prompt("Adresi " + links + " atvērt: \r\n1-jaunā TAB \r\n2-šajā logā \r\n3-atvērt jaunā logā \r\n4-šajā logā saglabājot history(assign)\r\n5-šajā logā(nesaglabājot history(replace)) \r\n6-exit", logatips);
      logatips = Number(logatips);
     } else {logatips=7}
if (logatips < 6 && logatips > 0 && logatips == Math.round(logatips)) {
   var count = 6;
   var el = document.getElementById("demo3");
   function timer() {
    count -= 1;
    el.innerText = "Līdz ielādei palika " + count + " sekundes.";
    if (count == 0) {
      clearInterval(cancel);
      switch (logatips){
      case 1:
      //1 atvērt jaunā tab
        window.open(links, "_blank");
        break;
      case 2:
      //2 atvērt šajā logā
        window.open(links, "_self");
        break;
      case 3:
      //3 atvērt jaunā logā
        window.open(links, "", "width=1024,height=768");
        break;
      case 4:
      //4 atvērt šajā logā(saglabājot history(assign))
        window.location.assign(links);
        break;
      case 5:
      //5 šajā logā(nesaglabājot history)
       window.location.replace(links);
      }
    }
  }
} else {document.getElementById("demo3").innerHTML = "Netika izvēlēti visi parametri lapas atvēršanai"}
  var cancel = setInterval(timer, 1000);
}

  
  


