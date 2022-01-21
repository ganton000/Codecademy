/*
Rock Paper Scissor game simulation project 
from Codecademy Back-end engineering career path
*/

const getUserChoice = (userInput) =>{
    userInput = userInput.toLowerCase();
    let res =  (userInput === 'rock' ||  userInput === 'paper' ||  userInput === 'scissors') ? userInput : console.log('Invalid input!');
    return res
  };
  
  // console.log(getUserChoice('rock'));
  // console.log(getUserChoice('abcd'));
  // console.log(getUserChoice('paper'))
  
  const getComputerChoice = () => {
    randomVal = Math.floor(Math.random()*3)
    switch (randomVal) {
      case 0:
      return 'rock';
      case 1:
      return 'paper';
      case 2:
      return 'scissors';
    };
  };
  
  // console.log(getComputerChoice())
  // console.log(getComputerChoice())
  // console.log(getComputerChoice())
  
  const determineWinner = (userChoice, computerChoice) => {
    if (!userChoice) {
      return ''
    }
    if (userChoice === 'bomb') {
      return 'No one beats the bomb. You won this round!'
    };
    if (userChoice === computerChoice){
      return `Computer chose: ${computerChoice}. This round ends in a tie.`
    };
    if (userChoice === 'rock') {
      if (computerChoice === 'paper'){
        return `Computer chose: ${computerChoice}. The winner of this round is the Computer!`
      }
      else {
        return `Computer chose: ${computerChoice}. Congratulations! You have won this round!`
      };
    };
    if (userChoice === 'paper'){
          if (computerChoice === 'scissors'){
        return `Computer chose: ${computerChoice}. You have lost this round, sorry!`
      }
      else {
        return `Computer chose: ${computerChoice}. Congratulations! You have beat the computer!`
      };
    };
    if (userChoice === 'scissors'){
          if (computerChoice === 'rock'){
        return `Computer chose: ${computerChoice}. Seems like you have lost this round, try again!`
      }
      else {
        return `Computer chose: ${computerChoice}. Congratulations! You have beat the computer!`
      };
    };
  }
  
  // console.log(determineWinner('rock','rock'));
  // console.log(determineWinner('rock','paper'));
  // console.log(determineWinner('rock','scissors'));
  // console.log(determineWinner('paper','paper'));
  
  let input = 'rock';
  
  const playGame = (input) =>{
    let userChoice = getUserChoice(input)
    let computerChoice = getComputerChoice()
  
    console.log(determineWinner(userChoice, computerChoice))
  };
  
  playGame(input)
  
  