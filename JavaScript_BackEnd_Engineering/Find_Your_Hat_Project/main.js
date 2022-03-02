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

  static generateField(height, width, percentage) {

    var numHoles = (percentage/100)*height*width;
    var this.field = new Array(width);
    this.field[0] = pathCharacter;
    const elementArr = [hat, hole, fieldCharacter];

    for (let i =0; i<width; i++){
      this.field[i] = 
    }

  }

};


//Instantiate Field Object
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

let endOfGame = false;

while (!endOfGames) {

  let direction = prompt('In which direction would you like to move?');

  if (direction.toLowerCase() in directions){
    switch(direction){
      case 'up':
      case 'down':
      case 'right':
      case 'left':
      }
    };

}
