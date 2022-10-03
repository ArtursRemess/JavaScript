const create_random_seats = function create_random_seats(seats_total, seats_occupied_total){ //izveido masīvu ar aizņemtajiem krēsliem
    var temp_string=[];
    for (let i = 0; i < seats_total; i++)  // izveido pagaidu rindu ar masīva indexiem
    { 
      temp_string.push(i) ;
    }
    let id_todel=0;
    let xxx = [];
    for (let i = 0; i < seats_occupied_total; i++){  // izvēlas gadījuma ierakstus un pārnes jaunajā masīvā
        id_todel=(Math.floor(Math.random() * (temp_string.length))); // atrod gadījuma skaitli
        xxx.push(Number(temp_string.splice(id_todel,1)));  // pārnes gadījuma skaitļu masīvā
    } 
     return xxx;
  }
  

test("Passes array containing", () => {
    expect.arrayContaining(create_random_seats(35,5));
});

test("Passes array length", () => {
  expect(create_random_seats(35,5).length).toBe(5);
});

test("Passes Max numebr", () => {
      create_random_seats(35,5).forEach(function(value) { expect((value < 35)).toBe(true); });
});
 
