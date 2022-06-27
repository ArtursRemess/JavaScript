var a = null,
  b = null,
  c = null;

a = 10;
b=9;
switch (a) {
  case 9:
    console.log("a ir 9");
    break;
  case 10:
    console.log("a ir 10");
    break;
  case 11:
    console.log("a ir 11");
    break;
  default:
    console.log("neviens no stavokliem default");
}
switch (b) {
    case 9:
      console.log("b ir 9");
    //   break;
    case 10:
      console.log("b ir 10");
    //   break;
    case 11:
      console.log("b ir 11");
    //   break;
    default:
      console.log("neviens no stavokliem default");
  }
  

document.getElementById("vestule").innerHTML = "ABC=" + a + b + c;
