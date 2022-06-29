var text = "",
  dalit = [2, 3, 4, 6, 8];

  
for (let i = 1; i < 25; i++) {
  text = text + i ;
  var flag=1;
  for (let k = 0; k < dalit.length; k++) {
    if (i % dalit[k] == 0) {
      if (flag ==1)
        {
          flag = 0 ;
          text = text + " dalās ar skaitli ";
        }
      text = text + dalit[k] + ",";
    }
  }
  if (flag==0)
  {
    text=text.slice(0,text.length-1);
  }


  if (i % 2 == 0) {
    text = text + " pāra skaitlis ";
  } else {
    text = text + " nepāra skaitlis ";
  }
  text = text + "<BR>";
}
document.getElementById("automatic_count").innerHTML = text;
