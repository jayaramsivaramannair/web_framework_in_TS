import axios, {AxiosResponse} from 'axios';


//Interface is used to define types
interface UserProps {
  //name and age property in this interface are made optional with use of a '?'
  id?: number;
  name?: string;
  age?: number;
}


//type alias - a callback function which takes no arguments and returns void
type Callback = () => void;

export class User {
  //events property will be an object with a string as its key and its associated value to be an array of callback functions
  events: {[key: string]: Callback[]} = {};

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

  //In this case, second parameter is a callback (defined by type alias above) which takes no parameters and returns nothing
  on(eventName: string, callback: Callback): void {
    //handlers will be either an array of callback functions or an empty array
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;

  }


  trigger(eventName: string) : void {
    const handlers = this.events[eventName];

    //check if handlers are associated with an event or not
    if(!handlers || handlers.length == 0) {
      return;
    }

    //loop through each handler in the array and invoke it
    handlers.forEach(callback => {
      callback();
    })
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
    .then((response: AxiosResponse): void => {
      this.set(response.data);
    })
  }
}