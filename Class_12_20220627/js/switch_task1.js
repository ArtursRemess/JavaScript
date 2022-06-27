var
browser='Safari'
if (browser=='Edge')
  {console.log( "You've got the Edge!" );}
else if (browser=='Chrome' || browser=='Firefox' || browser=='Safari' || browser=='Opera')
  {console.log( 'Okay we support these browsers too' );}
else
  {console.log( 'We hope that this page looks ok!' );}


// switch (browser) {
//   case 'Edge':
//     console.log( "You've got the Edge!" );
//     break;

//   case 'Chrome':
//   case 'Firefox':
//   case 'Safari':
//   case 'Opera':
//     console.log( 'Okay we support these browsers too' );
//     break;

//   default:
//     console.log( 'We hope that this page looks ok!' );
// }

let a = +prompt('a?', '');

switch (a){
  case 0:
      console.log("0");
      break;
  case 1:
    console.log("1");
    break;
  case 2:
  case 3:
    console.log("2,3");
  }

