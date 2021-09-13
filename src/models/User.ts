import {Eventing} from './Eventing';
import {Sync} from './Sync';
import {Attributes} from './Attributes';


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

  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    //Return a reference to the 'on' method available on an instance of Events class
    return this.events.on;
  }

  get trigger() {
    // Returns a reference to the 'trigger' method available on an instance of Events class
    return this.events.trigger;
  }

  get get() {
    // Returns a reference to the 'get' method available on an instance of attributes class
    return this.attributes.get;
  }

  set(update: UserProps) : void {
    this.attributes.set(update)
    //When the properties of a user instance are updated or initialized, a change event will also be triggered
    this.events.trigger('change')
  }
}