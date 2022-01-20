let raceNumber = Math.floor(Math.random() * 1000);

let isEarly = !true;
let isAge = 18;


if (isEarly && isAge > 18){
  raceNumber += 1000;
  console.log(`You race will be at 9:30 a.m. and your race number is ${raceNumber}. Good luck!`);
}
else if (isAge > 18 && !isEarly){
  console.log(`Your race will be at 11:00 a.m. and your race number is ${raceNumber}. Good luck!`);
}
else if (isAge < 18) {
  console.log(`Your face will be at 12:30 p.m. and your race number is ${raceNumber}. Break a leg!`);
}
else {
  console.log('Please see the registration desk.')
}

