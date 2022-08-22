window.name="oroginal"  ;
  let jsWindow = window.open(
    "http://127.0.0.1:5500/Class_20__20220725/",
    //"https://www.w3schools.com/js/js_object_prototypes.asp",
    "test",
    "height=600,width=800"
  );
  
  
  setTimeout(() => {
    jsWindow.alert("message");
    
  }, 4000);

  
  
  
  setTimeout(() => {
    jsWindow.moveTo(200,200);;// Will not work for third part resources because of CORS
  }, 2000);
  
  

  setTimeout(() => {
    window.open("http://127.0.0.1:5500/Class_19_20220720/", "test");
    //window.open("https://www.w3schools.com/js/js_this.asp", "test");
  }, 3000);

  


//   setTimeout(() => {
//     jsWindow.resizeTo(600, 300);// Will not work for third part resources because of CORS
//   }, 6000);
  
// jsWindow.moveTo(100,50);

//   setTimeout(() => {
//       jsWindow.close();
//     }, 9000);
  
//     setTimeout(() => {
//       window.open("http://127.0.0.1:5500/Class_19_20220720/", "_blank");
//     }, 12000);
   

// !!!!! kurš logs atvēra šo logu
// window.opener