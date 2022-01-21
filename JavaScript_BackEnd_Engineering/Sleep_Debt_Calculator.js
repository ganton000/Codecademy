/*
Codecademy Back-end engineering project.
Calculate actual sleep hours vs. ideal sleep hours.
*/

const getSleepHours = day => {
    if (!day) { return '' }
    days_array = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    day = day.toLowerCase()
    if (days_array.includes(day)) {
      return Math.floor(Math.random()*8)+2
    }
    else {
      return console.log('Invalid input!')||'';
    };
  };
  
  // console.log(getSleepHours(''))
  // console.log(getSleepHours('monday'))
  // console.log(getSleepHours('ice cream day'))
  // console.log(getSleepHours('wednesday'))
  
  const getActualSleepHours = () =>{
    let sum = 0;
    days_array = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
    for (let i = 0; i < 7; i++){
      sum += getSleepHours(days_array[i])
    }
    return sum
  };
  
  // console.log(getActualSleepHours())
  
  //Ideal of hours of sleep to get per night
  const getIdealSleepHours = (idealHours) => {
    return idealHours*7
  };
  
  // console.log(getIdealSleepHours())
  
  
  const calculateSleepDebt = (idealHours) => {
  
    if (!Number.isInteger(idealHours)){ 
      return Error('Input is not a valid number')
      };
    actualSleepHours = getActualSleepHours();
    idealSleepHours = getIdealSleepHours(idealHours);
  
    if (idealSleepHours === actualSleepHours){
      return 'You got the perfect amount of sleep!'
    }
    else if (idealSleepHours > actualSleepHours){
      return `You need to get some rest! Your ${idealSleepHours - actualSleepHours} hours away from having an ideal sleep schedule!`
    }
    else {
      return `You got ${actualSleepHours - idealSleepHours} more hours of sleep than needed!`
    };
  };
  
  idealHours = 7;
  console.log(calculateSleepDebt(idealHours))
  idealHours = '';
  console.log(calculateSleepDebt(idealHours))  