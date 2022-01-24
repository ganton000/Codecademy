
const _ = {

    clamp(number, lower, upper){
      let lowerClampedValue = Math.max(number, lower);
      let clampedValue = Math.min(lowerClampedValue, upper);
      return clampedValue;
    },
  
  //My brute-force approach 
    // inRange(number, start, end){
    //   if (end && end >= start){
    //     if (number === this.clamp(number, start, end-1)){
    //       return true;
    //     }
    //     else{
    //       return false;
    //     }
    //   }
    //   else if (end && end < start){
    //     if (number === this.clamp(number, end, start-1)){
    //       return true;
    //     }
    //     else{
    //       return false;
    //     }
    //   }
    //   else{
    //     if (number === this.clamp(number, 0, start-1)){
    //       return true;
    //     }
    //     else{
    //       return false;
    //     }
    //   }
    // }
  
  //Course solution
    inRange(number, start,end){
      if (end === undefined){
        end = start;
        start = 0;
      }
      if (start > end){
        let temp = end;
        end = start;
        start = temp;
      }
      let isInRange = start <= number && number < end
      return isInRange;
    },
  
    words(str) {
      return str.split(' ')
    },
  
    pad(string, length){
      if (string.length < length){
        let lengthDiff = length-string.length;
        leftPadLength = Math.floor(lengthDiff/2);
        rightPadLength = Math.ceil(lengthDiff/2);
  
        const paddedString =  ' '.repeat(leftPadLength) + string + ' '.repeat(rightPadLength);
        return paddedString;
      }
      else{
        return string
      }
    },
  
    has(obj, key){
      let hasValue = obj[key] !== undefined;
      return hasValue
    },
  
    invert(obj){
      res_obj = {}
      for (const [key,val] of Object.entries(obj)){
        res_obj[val] = key;
      }
      return res_obj
    },
  
    findKey(obj, func){
      for (const [key, val] of Object.entries(obj)){
        if (func(val)){
          return key;
        }
      }
      return undefined;
    },
  
    drop(arr, num){
      if (num === undefined){
        num = 1
      }
      let droppedArray = arr.slice(num, arr.length)
      return droppedArray;
    },
  
    dropWhile(arr, func){
      const cb = (element, index) => { return !func(element, index, arr)};
  
      let dropNumber = arr.findIndex(cb);
      let droppedArray = this.drop(arr, dropNumber);
  
      return droppedArray;
    },
  
  //Solution sets default size argument = 1 rather than conditional if() to check.
    chunk(arr, size) {
      res_arr = []
      // if (size === undefined){
      //   arr.forEach(val => res_arr.push([val]))
      //   return res_arr
      // }
      if (size === undefined){
        size = 1
      }
      //else{}
        for (let i = 0; i<arr.length; i += size){
          res_arr.push(arr.slice(i,i+size))
        }
      return res_arr;
    }
  };
  
  
  // Do not write or modify code below this line.
  module.exports = _;



// Do not write or modify code below this line.
module.exports = _;