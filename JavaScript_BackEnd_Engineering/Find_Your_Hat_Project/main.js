const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const directions = ['up', 'down', 'left', 'right'];

class Field {
  constructor(field_arr){
    this.field = field_arr;
  }

  print() {
    process.stdout.write(this.field.join(", "))
  }

  static generateField(height, width, percentage){

    var newField = [];
    let probHoles = Math.floor(percentage);
    const remainingCharsArr = [hat, fieldCharacter];

    for (let i=0; i<height; i++){
      var newArr = [];
      for (let j=0; j<width; j++ ){
        if (i === 0 && j === 0){
          newArr.push(pathCharacter);
          continue;
        }
        let probVal = Math.floor(Math.random()*100);
        if (probVal <= probHoles){
          newArr.push(hole);
        }
        else{
          newArr.push(remainingCharsArr[Math.floor(Math.random()*remainingCharsArr.length)]);
        }
      }
      newField.push(newArr);
    }

    return newField;
  }

};


//Instantiate Field Object
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

console.log(Field.generateField(4,3,50));

let endOfGame = false;

// while (!endOfGames) {

//   let direction = prompt('In which direction would you like to move?');

//   if (direction.toLowerCase() in directions){
//     switch(direction){
//       case 'up':
//       case 'down':
//       case 'right':
//       case 'left':
//       }
//     };

// }


