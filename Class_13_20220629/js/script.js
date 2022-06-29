var text = "",
  dalit = [2, 3, 4, 6, 8];
for (let i = 1; i < 25; i++) {
  text = text + i + " dalās ar skaitli ";
  for (let k = 0; k < dalit.length; k++) {
    if (i % dalit[k] == 0) {
      text = text + dalit[k] + ",";
    }
  }
  if (i % 2 == 0) {
    text = text.slice(0,text.length-1) + " pāra skaitlis ";
  } else {
    text = text.slice(0,text.length-1) + " nepāra skaitlis ";
  }

  text = text + "<BR>";
}
document.getElementById("automatic_count").innerHTML = text;
