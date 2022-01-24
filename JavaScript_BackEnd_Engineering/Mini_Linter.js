let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually' ];

const storyWords = story.split(' ')

let betterWords = storyWords.filter(word => !unnecessaryWords.includes(word))

console.log(`The number of words in the story is: ${storyWords.length}`)
console.log(`The number of \"better words\" in the story is: ${betterWords.length}`)
console.log('\n');

//Double check

for (let unnec_word of unnecessaryWords){
  console.log(`Does ${unnec_word} appear in \"better words\" filter: ${betterWords.every(word => word === unnec_word)}`)
};

let arrayOfOverusedWords = storyWords.filter(word => overusedWords.includes(word));
let overusedWordsAmount = arrayOfOverusedWords.length;

// outputs number of overused words
console.log(`The number of overused words in the story is: ${overusedWordsAmount}`) 
console.log('\n');

// outputs frequency of each overused word
let res_obj = {}
for (let overusedWord of overusedWords) {
  arrayOfOverusedWords.forEach(word => { 
    if (word === overusedWord) { 
      if (res_obj[overusedWord]) {
        res_obj[overusedWord] += 1
        } 
      else {
        res_obj[overusedWord] = 1
        } 
      }
    }
  )
};

console.log("The frequency of each overused Word is: ");
console.log(res_obj)
console.log('\n');


let new_obj = {}
for (let word of storyWords){
  if (word.endsWith('!')){
    if (new_obj[word[word.length-1]]){
      new_obj[word[word.length-1]] += 1
    }
    else{
      new_obj[word[word.length-1]] = 1
    }
  }
  else if (word.endsWith('.')){
    if (new_obj[word[word.length-1]]){
      new_obj[word[word.length-1]] += 1
    }
    else{
      new_obj[word[word.length-1]] = 1
    }
  }
  else if (!word.includes('-') || !word.includes('4') ){
    if (new_obj['word']){
      new_obj['word'] += 1
    }
    else{
      new_obj['word'] = 1
    }
  }
};


console.log('The frequency of specified punctuation marks is: ',new_obj)

const sentenceValuesArray = Object.values(new_obj);
console.log(`The number of sentences in the story is: ${sentenceValuesArray.reduce((accum, val) => accum + val, -new_obj['word'])} `)
console.log(`The number of words in the story is: ${new_obj['word']}`)

console.log('\n')
console.log(betterWords.join(' '))
console.log('\n')

//Function that finds the word that appears greatest number of times
const getMaxWord = (arrOfWords) => {
  freq_obj = {}
  for (word of arrOfWords){
    if (freq_obj[word]) { freq_obj[word] += 1 }
    else { freq_obj[word] = 1 }
  }
  let maxWord;
  let maxVal = 0;
  for (const [key,val] of Object.entries(freq_obj)){
    if (val > maxVal){
      maxWord = key;
      maxVal = val;
    }
  }
  return `The most frequently appeared word in our story is \"${maxWord}\" for a total of ${maxVal} times.`
};


console.log(getMaxWord(betterWords));

