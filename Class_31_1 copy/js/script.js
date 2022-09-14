// https://www.javascripttutorial.net/web-apis/javascript-cookies/

expires = new Date('2022-09-14T21:00:00.000');
//https://www.w3schools.com/js/js_cookies.asp
//A Function to Get a Cookie
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	console.log(document.cookie);
	console.log(ca);

	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
//	   noņem space sākumā
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
    	}
// ja rindas sākumā ir "name="  atgriež visu kas aiz "="		
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }
  console.log(getCookie("connection"));
  console.log(getCookie("cookie_name"));
  console.log("----------");

const str = document.cookie;
if(str==''){
  console.log('No cookie');
  i = 1;
  document.cookie = `connection=${i}; path=/; expires=${expires.toGMTString()}`;
  document.cookie = `cookie_name=cookie_value;`;
}
else{
  console.log("cookies: ",str);
  console.log("cookies (after split by connection=): ",str.split('connection='));
  //console.log("cookies (after split by connection=): ",str.split('connection=')[1]);
  i = Number(getCookie("connection")) + 1;
  // i = (Number(str.split('connection=')[1]) ? Number(str.split('connection=')[1]) : 1) + 1;
  document.cookie = `connection=${i}; path=/; expires=${expires.toGMTString()}`;
  //console.log("cookies (after split by ;): ",str.split('connection=')[0].split(';'));
  //console.log(str.split('connection=')[0].split(';')[0]);
}

// document.cookie = `username=admin; path=/; expires=${expires.toGMTString()}`;
// let intervalID = setInterval(check_cookie, 1000);
function check_cookie(){
  var current = new Date();
  console.log(current);
  const str = document.cookie;
  console.log(str);
  if(str==''){
    clearInterval(intervalID);
  }
}


/*
	function setCookie(cname,cvalue,exdays) {
	  const d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  let expires = "expires=" + d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	
	function getCookie(cname) {
	  let name = cname + "=";
	  let decodedCookie = decodeURIComponent(document.cookie);
	  let ca = decodedCookie.split(';');
	  for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	  }
	  return "";
	}
	
	function checkCookie() {
	  let user = getCookie("username");
	  if (user != "") {
		alert("Welcome again " + user);
	  } else {
		 user = prompt("Please enter your name:","");
		 if (user != "" && user != null) {
		   setCookie("username", user, 30);
		 }
	  }
	}

  
  let encodedCookie = encodeURIComponent(document.cookie);
  console.log("encode " + encodedCookie);

  let decodedCookie = decodeURIComponent(encodedCookie);
  console.log("decode " + decodedCookie);
*/

  /*

  ﻿// https://www.javascripttutorial.net/web-apis/javascript-cookies/

expires = new Date('2022-09-12T20:24:00.000');

document.cookie = `username=admin; path=/; expires=${expires.toGMTString()}`;

let intervalID = setInterval(check_cookie, 1000);

function check_cookie(){
  var current = new Date();
  console.log(current);
  const str = document.cookie;
  console.log(str);
  if(str==''){
    clearInterval(intervalID);
  }
}
*/