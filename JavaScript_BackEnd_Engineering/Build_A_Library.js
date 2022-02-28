/*
Congratulations, you’ve become head librarian at your local Books-‘N-Stuff,
which is in dire need of your help. 
They’re still using index cards to organize their content! Yikes.
But no matter, you know some JavaScript, so let’s get to work modernizing your new digs.

Books-‘N-Stuff carries three different types of media: books, CDs, and movies.
In this project you will create a parent class named Media with three subclasses: 
Book, Movie, and CD.
*/

class Media {
    constructor(title) {
      this._title = title;
      this._isCheckedOut = false;
      this._ratings = [];
    }
  
    get title() {
      return this._title;
    }
  
    get isCheckedOut() {
      return this._isCheckedOut;
    }
  
    get ratings() {
      return this._ratings;
    }
  
    set isCheckedOut(input) {
      this._isCheckedOut = input;
    }
  
    toggleCheckOutStatus() {
      if (this._isCheckedOut){
        this._isCheckedOut = false;
      }
      else {
        this._isCheckedOut = true;
      }
    }
  
    getAverageRating() {
      return this._ratings.reduce( (prevVal, currVal) => (prevVal + currVal), 0)/this._ratings.length
    }
  
    addRating(rating) {
      this._ratings.push(rating);
    }
  
  };
  
  class Book extends Media {
    constructor(author, title, pages){
      super(title);
      this._author = author;
      this._pages = pages;
    }
  
    get author() {
      return this._author;
    }
  
    get pages() {
      return this._pages;
    }
  }
  
  class Movie extends Media {
    constructor(director, title, runTime) {
      super(title);
      this._director = director;
      this._runTime = runTime;
    }
  
    get director() {
      return this._director;
    }
  
    get runTime() {
      return this._runTime;
    }
  }
  
  const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);
  
  historyOfEverything.toggleCheckOutStatus();
  
  console.log(historyOfEverything.isCheckedOut);
  
  historyOfEverything.addRating(4);
  historyOfEverything.addRating(5);
  historyOfEverything.addRating(5);
  
  console.log(historyOfEverything.getAverageRating());
  
  const speed = new Movie('Jan de Bont', 'Speed', 116);
  
  speed.toggleCheckOutStatus();
  
  console.log(speed.isCheckedOut);
  
  speed.addRating(1);
  speed.addRating(1);
  speed.addRating(5);
  
  console.log(speed.getAverageRating());
  
  class CD extends Media {
    constructor(artist, title, songs){
      super(title);
      this._artist = artist;
      this._songs = songs;
    }
  
    get artist() {
      return this._artist;
    }
  
    get songs() {
      return this._songs;
    }
  
    addSong(song) {
      this._songs.push(song);
    }
  
    getRandomSong() {
      return this._songs[Math.floor(Math.random()*this._songs.length)];
    }
  }
  
  const Catalog = new CD('No Doubt', 'Tragic Kingdom', ['Spiderwebs', 'Happy Now'])
  
  console.log(Catalog.songs);
  
  Catalog.addSong('Just A Girl');
  console.log(Catalog.songs);
  
  console.log(Catalog.getRandomSong());
  
  