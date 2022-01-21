/*
Challenge Project in Codecademy's Back-end Engineering JS career path course.
*/

let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

const generateTarget = () => Math.floor(Math.random()*10);

const getAbsoluteDistance = (num1, num2) => Math.abs(num1 - num2);



// My attempt 

const compareGuesses = (humanGuess, computerGuess, actualTarget) => {

  if (humanGuess < 0 || humanGuess > 9) {
    alert('Invalid number input! Try again please.')
  }
  computerDiff = getAbsoluteDistance(actualTarget, computerGuess);
  humanDiff = getAbsoluteDistance(actualTarget,humanGuess);

  if (computerDiff === humanDiff){
    return true; //human wins
  }
  else if (computerDiff < humanDiff){
    return false; //computer wins as it's diff is smaller
  }
  else {
    return true;
  }
};

//Solution attempt at above function, very clever:

/*
const compareGuesses = (humanGuess, computerGuess, targetGuess) => {
    const humanDifference = Math.abs(targetGuess - humanGuess)
    const computerDifference = Math.abs(targetGuess - computerGuess)
    return humanDifference <= computerDifference;
  }
*/

const updateScore = str => (str === 'human') ? humanScore += 1 : computerScore += 1;

const advanceRound = () => currentRoundNumber++;
