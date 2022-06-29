var
  d=new Date();
  d=d.toLocaleString('lv-LV');
  const datuma_teksta_garums=d.length;
  const atstarpe=d.indexOf(' ');
    
document.getElementById("laiks").innerHTML=d;
document.getElementById("currenttime").innerHTML =d.slice(atstarpe+1,datuma_teksta_garums);
document.getElementById("currentday").innerHTML =d.slice(0,atstarpe);