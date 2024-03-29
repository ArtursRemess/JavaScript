﻿// https://www.javascripttutorial.net/web-apis/javascript-cookies/

// expires = new Date('2022-09-14T21:00:00.000');
expires = new Date();
console.log(expires);
expires.setSeconds(expires.getSeconds() + 300);
console.log(expires);

var i = 1;
document.cookie = `connection=${i}; path=/; expires=${expires.toGMTString()}`;

class Cookie {
  static get(name) {
    const cookieName = `${encodeURIComponent(name)}=`;
    const cookie = document.cookie;
    let value = null;

    const startIndex = cookie.indexOf(cookieName);
    if (startIndex > -1) {
      let endIndex = cookie.indexOf(";", startIndex);
      if (endIndex == -1) {
        endIndex = cookie.length;
      }
      value = decodeURIComponent(
        cookie.substring(startIndex + cookieName.length, endIndex)
      );
    }
    return value;
  }

  static set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`;
    }

    if (path) cookieText += `; path=${path}`;
    if (domain) cookieText += `; domain=${domain}`;
    if (secure) cookieText += `; secure`;

    document.cookie = cookieText;
  }

  static modify(name, value, add) {
	if (Cookie.get(name)) {
      if (add == 1) {
		if (value)
			{document.cookie=`connection=${value+1}; path=/; expires=${expires.toGMTString()}`;}
		else
			{document.cookie=`connection=${Number(Cookie.get(name))+1}; path=/; expires=${expires.toGMTString()}`;}
      } else {
		console.log("exists");
		document.cookie=`connection=${value}; path=/; expires=${expires.toGMTString()}`;
      }
      
    }
  }

  static remove(name, path, domain, secure) {
    Cookie.set(name, "", new Date(0), path, domain, secure);
  }
}

console.log(Cookie.get("connection"));
 // Cookie.remove('connection',"/")

 function clickCounter() {
	if (typeof(Storage) !== "undefined") {
	  if (localStorage.clickcount) {
		localStorage.clickcount = Number(localStorage.clickcount)+1;
	  } else {
		localStorage.clickcount = 1;
	  }
	  document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
	} else {
	  document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
	}
  }
