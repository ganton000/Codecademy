/*
Let’s put your knowledge of classes to the test by creating a digital school catalog
for the New York City Department of Education. 
The Department of Education wants the catalog to hold quick reference material for each
school in the city.

We need to create classes for primary and high schools.
 Because these classes share properties and methods,
each will inherit from a parent School class
*/


class School {
    constructor(name, level, numberOfStudents){
      this._name = name;
      this._level = level;
      this._numberOfStudents = numberOfStudents;
    }
  
    get name() {
      return this._name;
    }
  
    get level() {
      return this._level;
    }
  
    get numberOfStudents() {
      return this._numberOfStudents;
    }
  
    set numberOfStudents(num) {
      if (typeof num === 'number'){
      this._numberOfStudents = num;
      }
      else {
        console.log('Invalid input: numberOfStudents must be set to a Number.')
      }
    }
  
    quickFacts() {
      console.log(`${this._name} educates ${this.numberOfStudents} at the ${this._level} school level.`)
    }
  
    static pickSubstituteTeacher(substituteTeachers) {
      return substituteTeachers[Math.floor(Math.random()*substituteTeachers.length)]
    }
  }
  
  class PrimarySchool extends School {
    constructor(name, numberOfStudents, pickupPolicy){
      super(name, 'primary', numberOfStudents);
      this._pickupPolicy = pickupPolicy;
    }
  
    get pickupPolicy() {
      return this._pickupPolicy;
    }
  };
  
  class MiddleSchool extends School {
    constructor(name, numberOfStudents){
      super(name, 'middle', numberOfStudents);
    }
  };
  
  class HighSchool extends School {
    constructor(name, numberOfStudents, sportsTeams){
      super(name, 'high', numberOfStudents);
      this._sportsTeams = sportsTeams;
    }
  
    get sportsTeams() {
      return this._sportsTeams;
    }
  
    addTeam(team) {
      this._sportsTeams.push(team);
    }
  };
  
  const lorraineHansbury = new PrimarySchool('Lorraine Hansbury', 514, 'Students must be picked up by a parent, guardian, or a family member over the age of 13.');
  
  lorraineHansbury.quickFacts();
  
  console.log(PrimarySchool.pickSubstituteTeacher(['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli']));
  
  const alSmith = new HighSchool('Al E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball', 'Track and Field']);
  
  console.log(alSmith.sportsTeams);
  console.log(alSmith.level);
    