//Interface is used to define types
interface UserProps {
  //name and age property in this interface are made optional with use of a '?'
  name?: string;
  age?: number;
}

export class User {
  //data property is made private so that it cannot be accessed outside the class
  constructor(private data: UserProps) {}

  get(propName: string): (string | number) {
    return this.data[propName]
  }

  set(update: UserProps) : void {
    //Object.assign takes the first parameter which is the current object property on the User class
    // It replaces the first parameter with an object property in the second parameter
    Object.assign(this.data, update);
  }
}