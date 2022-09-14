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
		let endIndex = cookie.indexOf(';', startIndex);
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

	static modify(name, value ) {
	 if (Cookie.get(name))
		{
		let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(Number(value)+1)}`;
				
		document.cookie = cookieText;
	  }
	  }
   







  
	static remove(name, path, domain, secure) {
	  Cookie.set(name, '', new Date(0), path, domain, secure);
	}
  }

  console.log(Cookie.get("connection"));
//  Cookie.remove('connection',"/")
