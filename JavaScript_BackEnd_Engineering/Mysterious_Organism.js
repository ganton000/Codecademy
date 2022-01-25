/*
You’re part of a research team that has found a new mysterious organism at the 
bottom of the ocean near hydrothermal vents. 
Your team names the organism, Pila aequor (P. aequor), and finds that 
it is only comprised of 15 DNA bases. 
The small DNA samples and frequency at which it mutates due to the 
hydrothermal vents make P. aequor an interesting specimen to study. 
However, P. aequor cannot survive above sea level and locating P. aequor in the 
deep sea is difficult and expensive. 
Your job is to create objects that simulate the DNA of P. aequor for your 
research team to study.
*/

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

pAequorFactory = (num, arrayOfDNA) => {
  return {
    specimenNum: num,
    dna: arrayOfDNA,

    mutate(){
      let randVal = Math.floor(Math.random()*15);
      const dnaBases = ['A', 'T', 'C', 'G']
      const filteredArray = dnaBases.filter(val => val !== this.dna[randVal]);
      console.log(`Old value: ${this.dna[randVal]}`)
      res = filteredArray[Math.floor(Math.random()*3)];
      this.dna.splice(randVal,1,res);
      console.log(`New val: ${res}`)
      return this.dna;
    },

    compareDNA(pAequor){
      let inCommon = 0;
      for (let i =0; i<this.dna.length; i++){
        if (this.dna[i] === pAequor.dna[i]){
          inCommon += 1;
        }
      }
      inCommon = (inCommon/this.dna.length)*100;
      // console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${inCommon}% DNA in common.`)
      return inCommon;
    },

    willLikelySurvive(){
      const filteredArray = this.dna.filter(base => base === 'C' || base === 'G');
      res = filteredArray.length/this.dna.length;
      return res >= .60;
    }
  }
};

//Create 30 instances
const pAequorCreaturesArray = [];
for (let i = 0; i < 30; i++){
  pAequorCreaturesArray.push(pAequorFactory(i,mockUpStrand()));
};


const MostRelatedPairOfCreatures = (arrayOfCreatures) => {
  let mostCommon = 0;
  let strOutput = '';
  for (let creature1 of arrayOfCreatures){
    for (let creature2 of arrayOfCreatures){
      if (creature1.specimenNum !== creature2.specimenNum){
        valToCompare = creature1.compareDNA(creature2)
        if (valToCompare > mostCommon){
          mostCommon = valToCompare
          strOutput = `Specimen #${creature1.specimenNum} and Specimen #${creature2.specimenNum} have the most common DNA sequence, at ${mostCommon}%.`
        }
      }
    }
  }
  return strOutput;
};


console.log(MostRelatedPairOfCreatures(pAequorCreaturesArray));
console.log('\n')

for (let creature of pAequorCreaturesArray.slice(0,10)){
  console.log(`Is specimen #${creature.specimenNum} likely to survive? ${creature.willLikelySurvive()}`)
}

let testSpecimen = pAequorCreaturesArray[Math.floor(Math.random()*31)];

console.log('\n')
console.log('Test of .mutate()')
let oldDNA = testSpecimen.dna;
let oldCreature = pAequorFactory(31,oldDNA);
console.log(`Before mutation: ${oldDNA.join('')}`);
testSpecimen.mutate();
console.log(`After mutation: ${testSpecimen.dna.join('')}`);

console.log(`Percent in common should be 93.33%; it is: ${oldCreature.compareDNA(testSpecimen)}%`);