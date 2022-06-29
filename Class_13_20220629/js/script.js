var   text = "";
for (let i = 1; i < 25; i++) 
{
  text = text+ i+ " dalās ar skaitli ";
  for (var k=2; k<7; k++ )
      if (i % k == 0) {
      text = text+k+",";
     }
    
    if (i%2 == 0)
    {
      text = text +  " pāra skaitlis "
    }
    else 
    {
      text = text +  " nepāra skaitlis "
    }
  
  text=text+"<BR>";
}

document.getElementById("automatic_count").innerHTML = text;
