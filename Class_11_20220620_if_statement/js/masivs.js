var x=[2,1,3];
   
document.getElementById("vestule").innerHTML = ("Pirms"+ x[0] + x[1]+ x[2]);

if (x[1]>x[0])
    {
 //   x[0]=x[0]+x[1];
 //   b=x[0]-x[1];
 //   x[0]=x[0]-x[1];
        [x[0],x[1]]=[x[1],x[0]];
  //  x[2]onsole.log("a= "+ a + " x[1]= "+ x[1] + " x[2]= " + x[2]);
    }
if (x[2]>x[0])
    {
        x[0]=x[0]+x[2];
        x[2]=x[0]-x[2];
        x[0]=x[0]-x[2];
  //  x[2]onsole.log("x[0]= "+ x[0] + " x[1]= "+ x[1] + " x[2]= " + x[2]);
    }
if (x[2]>x[1])
    {
        x[1]=x[1]^x[2];
        x[2]=x[1]^x[2];
        x[1]=x[1]^x[2];
    }
    document.getElementById("vestule1").innerHTML = ("Pēc"+ x[0] + x[1]+ x[2]);

