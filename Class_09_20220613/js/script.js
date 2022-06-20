var 
    vards = 'Ivars Godmanis',
    summa = 10000,
    procenti=0,
    teksts = '';
 

teksts='Cien. ' + vards + '<br>';
teksts=teksts+'Mēs redzam, ka jūsu kontā ir '+summa+ ' EUR liela naudas summa<br>';

teksts=teksts+'Ja jūs ieguldīsiet uz 1 gadu, 1.gadā jūs nopelnīsiet ' +(Math.round(summa*0.01));
summa=summa+(Math.round(summa*0.01));
teksts=teksts+' EUR un  jums būs '+(Math.round(summa))+' EUR<br>';

teksts=teksts+'Ja jūs ieguldīsiet uz 2 gadiem, 2.gadā jūs nopelnīsiet '+(Math.round(summa*0.02));
summa=summa+(Math.round(summa*0.02));
teksts=teksts+' EUR un  jums būs '+(Math.round(summa))+' EUR<br>';

teksts=teksts+'Ja jūs ieguldīsiet uz 3 gadiem, 3.gadā jūs nopelnīsiet '+(Math.round(summa*0.03));
summa=summa+(Math.round(summa*0.03));
teksts=teksts+' EUR un  jums būs '+(Math.round(summa))+' EUR<br>';

teksts=teksts+'Ja jūs ieguldīsiet uz 4 gadiem, 4.gadā jūs nopelnīsiet '+(Math.round(summa*0.04));
summa=summa+(Math.round(summa*0.04));
teksts=teksts+' EUR un  jums būs '+(Math.round(summa))+' EUR<br>';

teksts=teksts+'Ja jūs ieguldīsiet uz 5 gadiem, 5.gadā jūs nopelnīsiet '+(Math.round(summa*0.05));
summa=summa+(Math.round(summa*0.05));
teksts=teksts+' EUR un  jums būs '+(Math.round(summa))+' EUR<br>';

console.log(teksts);
document.getElementById("vestule").innerHTML = teksts;

