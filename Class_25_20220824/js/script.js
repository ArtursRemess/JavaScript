
function myFunction() {
    output.innerText = document.querySelector('input[name="rate"]:checked').id;

    /* zvaigznes */
    var stars_count = Number(document.querySelector('input[name="rate"]:checked').value);
    var stars='';
    for (let i = 1; i < 6; i++) {
        if (i <= stars_count) {stars += '<span class="fa fa-star checked"></span>'} 
        else {stars += '<span class="fa fa-star"></span>'};
    }
    document.getElementById('stars').innerHTML=stars;
}

    //  const h1 = document.getElementById('h1');
    // h1.innerHTML=stars;
    // h1.firstChild.textContent = stars;
    // const secondChildNode = document.querySelector("text");
   // console.log(secondChildNode.nodeType);
   // console.log(secondChildNode.nodeName);
   // console.log(secondChildNode.nodeValue);
    

    // const listItem = document.querySelector("text");
     // 
    //const newItem = document.createElement('span');
    // newItem.innerHTML = stars;
  //  listItem.parentNode.replaceChild(newItem, listItem);

    // document.getElementById('text').replaceWith(stars);
     
    // document.getElementById("text")=text;
  
/*
if (rates.checked == true){
    document.getElementById("demo").innerHTML="Rating: " + rate.value;
  } else {
    document.getElementById("demo").innerHTML="Rating: " + rate.value;
  }
*/


/*
let btn = document.getElementById('btnRate');
        let output = document.getElementById('output');

         btn.addEventListener('click', () => {
            let rates = document.getElementsByName('rate');
            rates.forEach((rate) => {
                console.log(rate.value+''+rate.checked);
                if (rate.checked) {
                    output.innerText = `You selected: ${rate.value}`;
                    document.getElementById("demo").innerHTML="Rating: " + rate.value;
                    alert('stop');
                 }
            });
       document.forms["form1"].submit();
       });

const p = document.getElementById('demo');
console.log(p);
console.log("p.innerHTML: "+p.innerHTML);
p.innerHTML = "Paragrāfa teksts (mainīts 1. reizi.)";
console.log("p.innerText: "+p.innerText);
p.innerText = "Paragrāfa teksts (mainīts 2. reizi.)";
console.log("p.firstChild.nodeType: "+p.firstChild.nodeType);
console.log("p.firstChild.textContent: "+p.firstChild.textContent);
p.firstChild.textContent = "Paragrāfa teksts (mainīts 3. reizi.)";
console.log(p.querySelectorAll('*[id]'));



const p = document.createElement("p");
p.textContent = "Once upon a time…";
console.log(p.nodeType);
console.log(p.textContent);
console.log(p.textContent.nodeType);

const firstChildNode = document.documentElement.firstChild;
if (firstChildNode.nodeType !== Node.COMMENT_NODE) {
    console.warn("You should comment your code!");
    console.log(firstChildNode.nodeType);
    console.log(firstChildNode.nodeName);
    console.log(firstChildNode.nodeValue);
}
else {
    console.log("Good! :-) code is commented/described");
    console.log(firstChildNode.nodeType);
    console.log(firstChildNode.nodeName);
    console.log(firstChildNode.nodeValue);
}

console.log("\n secondChildNode");

const secondChildNode = firstChildNode.nextSibling;
console.log(secondChildNode.nodeType);
console.log(secondChildNode.nodeName);
console.log(secondChildNode.nodeValue);


console.log("\n thirdChildNode");

const thirdChildNode = secondChildNode.nextSibling;
console.log(thirdChildNode.nodeType);
console.log(thirdChildNode.nodeName);
console.log(thirdChildNode.nodeValue);

console.log("\n fourthChildNode");

const fourthChildNode = thirdChildNode.nextSibling;
console.log(fourthChildNode.nodeType);
console.log(fourthChildNode.nodeName);
console.log(fourthChildNode.nodeValue);

const fifthChildNode = fourthChildNode.nextSibling;
console.log(fifthChildNode.nodeType);
console.log(fifthChildNode.nodeName);
console.log(fifthChildNode.nodeValue);

const lastChildNode = document.documentElement.lastChild;
console.log("\n");
console.log(lastChildNode.nodeType);
console.log(lastChildNode.nodeName);
console.log(lastChildNode.nodeValue);

console.log("\n");
console.log(document.firstChild.nodeType);
console.log(document.firstChild.nodeName);
console.log(document.firstChild.nodeValue);

console.log("\n");
console.log(document.firstChild.nextSibling.nodeType);
console.log(document.firstChild.nextSibling.nodeName);
console.log(document.firstChild.nextSibling.nodeValue);

console.log("\n");
console.log(document.lastChild.nodeType);
console.log(document.lastChild.nodeName);
console.log(document.lastChild.nodeValue);
*/