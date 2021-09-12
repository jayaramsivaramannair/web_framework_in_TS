import {Eventing} from './Eventing';
import {Sync} from './Sync';


//Interface is used to define types
export interface UserProps {
  //name and age property in this interface are made optional with use of a '?'
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  
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