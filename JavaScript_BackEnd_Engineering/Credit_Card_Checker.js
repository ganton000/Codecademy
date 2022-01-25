// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

//Luhn Algorithm source: https://en.wikipedia.org/wiki/Luhn_algorithm#Description
const luhnAlgorithm = (array) =>{
  let checkSum = 0;
  const isEven = array.length%2 === 0;

  if (isEven){
    for (let i=array.length-1; i>0; i -=2){

      checkSum += array[i];
      let double = 2*array[i-1];
      if (double > 9){ checkSum += double-9 }
      else{ checkSum += double }
    }
  }

  else{
    let i = array.length-1;
    do{
      checkSum += array[i];
      let double = 2*array[i-1];
      if (double > 9){ checkSum += double-9 }
      else{ checkSum += double }
      i -= 2;
    } while (i > 1);
    checkSum += array[0];
  }
  let res = checkSum%10;
  return res;
};

//return true if valid cc, otherwise false
const validateCred = (array) =>{
  return luhnAlgorithm(array) === 0;
};

//returns nested array containing invalid cards
const findInvalidCards = (nested_array) =>{

  //As valid arrays of luhnAlgorithm return 0 (false),
  //everything else will be invalid. 
  let res = nested_array.filter(luhnAlgorithm)
  return res;
};

//returns array of companies attributed to invalid numbers
const idInvalidCardCompanies = (nested_arr) =>{

  if (!Array.isArray(nested_arr[0])){
    switch(nested_arr[0]){
      case 3:
      return ['Amex'];
      case 4:
      return ['Visa'];
      case 5:
      return ['Mastercard'];
      case 6:
      return ['Discover'];
      default:
      return ['Company not found'];
    }
  }

  const res_obj = {};
  for (let arr of nested_arr){
    switch(arr[0]){
      case 3:
      res_obj[3] = 'Amex';
      break;
      case 4:
      res_obj[4] = 'Visa';
      break;
      case 5:
      res_obj[5] = 'Mastercard';
      break;
      case 6:
      res_obj[6] = 'Discover';
      break;
      default:
      res_obj[arr[0]] = 'Company not found';
    }
  }
  let invalidCardCompaniesArray = Object.values(res_obj);
  return invalidCardCompaniesArray;
};


//Test Functions
const assert = {
    
    equals(testName, description, functionString, actualValue, expectedValue) {
    if (actualValue === expectedValue) {
      console.log("\x1b[32m%s\x1b[0m", `${description} - Passed!`);
    } else {
      console.log("\x1b[31m%s\x1b[0m", `${description} - Failed: ${functionString} returned ${actualValue} instead of ${expectedValue}.`);
    }
  },

  isArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
  }

};

const validateCredTest = (func, pos_cases, neg_cases) =>{
for (let array of pos_cases){
assert.equals('validateCred Test: positive cases', 'Returns true if array contains valid credit number', 'validateCred(array)', func(array), true);
}
for (let array of neg_cases){
assert.equals( `validateCred Test: false cases`, 'Returns false if array contains invalid card number', 'validateCred(array)', func(array), false);
}
};


const idCardCompaniesTest = (func) => {
  console.log(`Is the result an array? ${assert.isArray(func(batch.slice(5,10)))}`);
  //invalid1 array returns ['Visa']
  assert.equals( `idCardCompany Test`, 'Returns array of card company', 'idInvalidCardCompanies(array)', func(invalid1)[0], 'Visa');
  //invalid2 array returns ['Mastercard']
  assert.equals( `idCardCompany Test`, 'Returns array of card company', 'idInvalidCardCompanies(array)', func(invalid2)[0], 'Mastercard');  
  //invalid3 array returns ['Amex']
  assert.equals( `idCardCompany Test`, 'Returns array of card company', 'idInvalidCardCompanies(array)', func(invalid3)[0], 'Amex' );
  //invalid4 array returns ['Discover']
  assert.equals( `idCardCompany Test`, 'Returns array of card company', 'idInvalidCardCompanies(array)', func(invalid4)[0], 'Discover');
  //invalid5 array returns ['Mastercard']
  assert.equals( `idCardCompany Test`, 'Returns array of card company', 'idInvalidCardCompanies(array)', func(invalid5)[0], 'Mastercard');
  console.log('\n')
  console.log(`idInvalidCardCompanies(batch.slice(5,10)) gives: [${idInvalidCardCompanies(batch.slice(5,10))}] and expects: [Amex,Visa,Mastercard,Discover]`);

};

//Results
console.log('Validate Cards Test Results: \n')
validateCredTest(validateCred, batch.slice(0,5), batch.slice(5,10));
console.log('\n');

console.log('Id Card Companies Test Results: \n')
idCardCompaniesTest(idInvalidCardCompanies);
console.log('\n');

console.log('Find Invalid Cards Test Results: \n')
console.log(`Is the result an array? ${assert.isArray(findInvalidCards(batch))}`);
console.log(findInvalidCards(batch));

