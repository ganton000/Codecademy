const prompt = require('prompt');
const sPrompt = require('prompt-sync')();
//const events = require('events');
const colors = require("@colors/colors/safe");

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field_arr){
    this.field = field_arr;
    this.x = 0;
    this.y = 0;
  }

  print() {
    process.stdout.write(this.field.join(", "))
  }

  printField() {
      console.log(this.field);
  }

  static generateField(height, width, percentage){

    var newField = [];
    let probHoles = Math.floor(percentage);

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
          newArr.push(fieldCharacter);
        }
      }
      newField.push(newArr);
    }

    let assignedHat = false;
    while (!assignedHat) {

    let i = Math.floor(Math.random()*height)
    let j = Math.floor(Math.random()*width)

    if (i === 0 && j === 0) { continue }
    else { 
      newField[i][j] = hat
      assignedHat = true; }
    }

    return newField;
  }

  move(direction) {
      
    const dimensions = [this.field.length, this.field[0].length];
    let resChar;

    function checkChar(char){
        if (char === '^'){ return 'hat' }
        else if (char === 'O') { return 'hole' }
        else { return 1 }
    }
    
    switch(direction) {
        case "up": {
            if (this.x === 0) { return false }
            this.x -= 1;

            resChar = checkChar(this.field[this.x][this.y])
            if (isNaN(resChar)){
                return resChar;
            } else{
                this.field[this.x][this.y] = pathCharacter;
                return true
            }
        }

        case "down": {
            if (this.x === dimensions[0]){ return false }
            this.x += 1;
            resChar = checkChar(this.field[this.x][this.y])
            if (isNaN(resChar)){
                return resChar;
            } else{
                this.field[this.x][this.y] = pathCharacter;
                return true
            }
        }

        case "right": {
            if (this.y === dimensions[1]){ return false }
            this.y += 1;
            resChar = checkChar(this.field[this.x][this.y])
            if (isNaN(resChar)){
                return resChar;
            } else{
                this.field[this.x][this.y] = pathCharacter;
                return true
            }
        }

        case "left": {
            if (this.y === 0){ return false }
            this.y -= 1;
            resChar = checkChar(this.field[this.x][this.y])
            if (isNaN(resChar)){
                return resChar;
            } else{
                this.field[this.x][this.y] = pathCharacter;
                return true
            }
        }
      }

  }

};


function startGame() {

    const properties = [ 
        { name: "length",
        description: colors.magenta("Enter length"),
        validator: /^[0-9]+$/,
        warning: 'Height must be a numerical positive value only',
        required: true
    }, {
        name: 'width',
        description: colors.magenta("Enter width"),
        validator: /^[0-9]+$/,
        warning: 'Width must be a numerical positive value only',
        required: true
    },{
        name: "percentage",
        description: colors.magenta("Enter percentage (optional)"),
        validator: /^[0-9]+$/,
        warning: 'Percentage must be a numerical positive value only',
        required: false
    }]    

    prompt.start();

    function onErr(err) {
        console.log(err);
        return 1;
    }

    prompt.get(properties, function(err, result) {

        if (err) { return onErr(err); }
        
        let fieldArr = Field.generateField(result.length, result.width, result.percentage);
        let myField = new Field(fieldArr);
        myField.printField()
        return playRound(myField)

    });
    
};

const playRound = (field) => {

    const outOfRangeMessage = ["You have walked out of the field! Whoops! Better luck next round!",
    "You have moved outside of the field! Try another round.",
    "You have moved outside of the field! Good luck on the next round!",
    "You have fallen outside of the field! Oops! Better luck next time!"];

    const winLoseMessage = ["Congratulations!! You have found your hat and won!",
    "Oh no, you have fallen into the hole and cannot escape. Try again next game!"];

    const directions = ['up', 'down', 'left', 'right'];

    let direction = sPrompt('In which direction would you like to move? ').toLowerCase();
        
    if (directions.includes(direction)){

        let res = field.move(direction);
        if (!res) {
            field.printField()
            console.log(colors.red(outOfRangeMessage[Math.floor(Math.random()*outOfRangeMessage.length)]))
        } else if (isNaN(res)){
            if (res === 'hat'){
                field.printField()
                console.log(colors.green(winLoseMessage[0]))
            } else {
                field.printField()
                console.log(colors.red(winLoseMessage[1]))
            }
        } else {
            field.printField()
            playRound(field);
        }
    
    } else{ 
        console.log('You can only move up, down, left or right.')
    }

};

const playGame = new Promise((resolve, reject) => {

    let welcomeMessage = `Welcome! The objective of this game is to find your hat, \'^\', 
    while traversing through the maze, starting from the upper left corner.\n
    There will be holes, \'O\', in the ground which you would need to avoid and a field, \'░\', 
    which you would need to stay within in order to not lose.\n
    Before we begin, what is the length and width of the grid you would like to play within.\n 
    As an optional third parameter, you can include a number from 0-100 for the percentage of holes 
    you\'d wish to see in the maze.`;

    if (welcomeMessage){
        resolve(console.log(welcomeMessage))
    } else {
        reject('Error starting the game :(')
    }
});

playGame.then( () => { startGame() 
}).catch( (message) => {console.log(message)})



