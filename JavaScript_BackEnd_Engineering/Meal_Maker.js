/*
In this project, you’ll use JavaScript to randomly create a three-course meal 
based on what is available on a menu. We’ll keep running it until we’re satisfied with 
the generated meal!
*/



const menu = {
    _courses: {
      appetizers: [],
      mains: [],
      desserts: []
    },
    get appetizers(){
      if (this._courses['appetizers']){
        return this._courses.appetizers;
      }
      else{
        return 'There are no appetizers on the menu.'
      }
    },
    set appetizers(appetizerIn){
      if (typeof appetizerIn === 'object' && appetizerIn){
      this._courses['appetizers'].push(appetizerIn)
      }
      else{
        return 'Please enter a valid appetizer for the menu.'
      }
    },
      get mains(){
      if (this._courses['mains']){
        return this._courses.mains;
      }
      else{
        return 'There are no main entrees on the menu.'
      }
    },
    set mains(mainEntreeIn){
      if (typeof mainEntreeIn === 'object' && mainEntreeIn){
      this._courses['mains'].push(mainEntreeIn)
      }
      else{
        return 'Please enter a valid entree as a main course for the menu.'
      }
    },  
    get desserts(){
      if (this._courses['desserts']){
        return this._courses.desserts;
      }
      else{
        return 'There are no desserts on the menu.'
      }
    },
    set desserts(dessertIn){
      if (typeof dessertIn === 'object' && dessertIn){
      this._courses['desserts'].push(dessertIn)
      }
      else{
        return 'Please enter a valid dessert for the menu.'
      }
    },
    get courses(){
      if (this._courses){ 
        return this._courses;
        }
      else{
        return 'There are no courses currently available!'
      }
    },
    addDishToCourse(courseName, dishName, dishPrice) {
      const dish = {
        name: dishName,
        price: dishPrice
      };
      switch (courseName){
        case 'appetizers':
        this._courses[courseName].push(dish);
        break;
        case 'mains':
        this._courses[courseName].push(dish);
        break;
        case 'desserts':
        this._courses[courseName].push(dish);
        break;
      }
    },
    getRandomDishFromCourse(courseName){
      const arr = ['appetizers','mains','desserts'];
      let dishes;
      if (arr.includes(courseName)){
      dishes = this.courses[courseName];
      }
      else{
        Error('Invalid Course Name')
      }
      const randomVal = Math.floor(Math.random()*dishes.length);
      return dishes[randomVal];
    },
    generateRandomMeal(){
      const appetizer = this.getRandomDishFromCourse('appetizers');
      const main = this.getRandomDishFromCourse('mains');
      const dessert = this.getRandomDishFromCourse('desserts');
  
      if (appetizer && main && dessert){
  
      const totalPrice = Math.ceil(appetizer.price + main.price + dessert.price);
  
      return `Your three course meal will include ${appetizer.name} as an appetizer, ${main.name} as your main entree and ${dessert.name} for dessert. The total price for this will be $${totalPrice}.`
      }
      else{
        return 'Missing one or more meals on the three-course menu.'
      }
    }
  };
  
  
  //add items onto menu
  menu.addDishToCourse('appetizers','Steamed Dumpling',9.99);
  menu.addDishToCourse('appetizers','Spring Roll',2.00);
  menu.addDishToCourse('appetizers','Chicken Satay',6.99);
  
  menu.addDishToCourse('mains','Pad See Ew', 11.99);
  menu.addDishToCourse('mains','Pad Thai',11.99);
  menu.addDishToCourse('mains','Panang Curry',11.99);
  
  menu.addDishToCourse('desserts','Thai Coconut Pudding',6);
  menu.addDishToCourse('desserts','Tiramisu',6);
  menu.addDishToCourse('desserts','Cheesecake',6);
  
  
  let meal = menu.generateRandomMeal();
  
  console.log(meal)
  
  
  
