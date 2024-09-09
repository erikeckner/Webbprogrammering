'use strict';
import { v4 as uuidv4 } from 'uuid';
/**
 * Reflection question 1
 * your answer goes here
 * In Javascript when abscence of a property it will assume it will be false and therefore save memory. 
 */

import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);

names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * When we have inherited propterties of an object the foreach will not print out the inherited proprty whilst the for in loop will. 
 * For example in this a abstract object of a vegetable is lactos-free but the implementation of the object cucumber will not have that property
 * In its own sub object. 
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {

  const filteredProperties = Object.keys(inventory).filter(name => inventory[name][prop])
  .map(name => `<option value="${name}" key="${name}">${name}, ${inventory[name].price} kr</option>`);
  return filteredProperties;
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static instanceCounter = 0; 
  
  constructor(arg) { 
    const uuid = uuidv4();
    this.id = 'salad_' + Salad.instanceCounter++;
    if (arg instanceof Salad){
      this.ingredients = {...arg.ingredients};
      this.uuid = uuidv4();

      if (arg.uuid) {
        this.uuid = arg.uuid;  // Preserve UUID if provided (parse case)
      }
    }
    else{
      this.ingredients = {};
      this.uuid = uuidv4();
    }
  }
  add(name, properties) { 
    this.ingredients[name] = properties;
    return this;
  }
  remove(name) { 
    if(this.ingredients.hasOwnProperty(name)){
      delete this.ingredients[name];
  }
  return this;
}
  getPrice() {
    return Object.values(this.ingredients).reduce((total, ingredient) => total + ingredient.price, 0);
  }
  count(property) {
    return Object.values(this.ingredients).filter(ingredient => ingredient[property] === true).length;
  } 

  static parse(json){    
    const parsedSalad = JSON.parse(json);

    if(Array.isArray(parsedSalad)){
      return parsedSalad.map(data => new Salad(data.ingredients));
    }else{
      return new Salad(parsedSalad.ingredients);
    }
  }
}

class GourmetSalad extends Salad{

  constructor(arg = null){
    super(arg);
  }
  add(name, properties, size = 1){
    if (this.ingredients[name]){
      this.ingredients[name].size += size;
    }else{
      const propertiesCopy = {...properties, size};
      super.add(name, propertiesCopy);
    }
    return this
  }
  getPrice(){
    return Object.values(this.ingredients).reduce((total, ingredient) => total + ingredient.price * ingredient.size, 0);
  }
}





let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
//En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')


console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * Reflection question 4
 * In javascript the static properties are stored directly on the class itself not on a instance of the 
 * class. It belongs to the constructor function
 * 
 */
/**
 * Reflection question 5
 * Yes you can make the id property read only by using Object.defineProperty()
 */
/**
 * Reflection question 6
 * Yes properties can be private by using # syntax. 
 */
