let userName = '';

//ternary operator to greet user, depends on content so userName
userName ? console.log(`Hello ${userName}!`) : console.log('Hello!')

//create question user might ask
const userQuestion = 'Will I become a werewolf tonight?';

//re-iterate back question
console.log( userName ? `${userName}, your`:'Your', `question is: ${userQuestion} I dare say,`, userName ? `${userName}, you`: `you`, `are about to find out!`);


//eightBall will take string depending on randomNumber
let randomNumber = Math.floor(Math.random()*8);
let eightBall = '';

switch (randomNumber){
  case 0:
  eightBall = 'Outlook is positive';
  break;
  case 1:
  eightBall = 'It is certain';
  break;
  case 2:
  eightBall = 'Reply hazy, try again!';
  break;
  case 3:
  eightBall = 'Cannot predict now';
  break;
  case 4:
  eightBall = 'Do not count on it';
  break;
  case 5:
  eightBall = 'It is decidely so';
  break;
  case 6:
  eightBall = 'My sources say no';
  break;
  case 7:
  eightBall = 'Signs point to yes';
  break;
  case 8:
  eightBall = 'I don\'t have all the answers. Look elsewhere';
  break;
  default:
  eightBall = 'You have managed to break into the Matrix. Congratulations';
  break;
}

console.log(`I see your number is ${randomNumber}! The Magic Eight Ball responds with: \n${eightBall}`)