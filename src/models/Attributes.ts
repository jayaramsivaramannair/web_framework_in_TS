
export class Attributes<T> {
  //data property is made private so that it cannot be accessed outside the class
  constructor(private data: T) {}

  
  //K extends keyof T constraints the 'key' value which is passed as a parameter
  //Important Note: Try to use Arrow Functions even when definiing methods inside a class as below
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  set(update: T) : void {
    //Object.assign takes the first parameter which is the current object property on the User class
    // It replaces the first parameter with an object property in the second parameter
    Object.assign(this.data, update);
  }

  getAll() : T {
    return this.data;
  }
}