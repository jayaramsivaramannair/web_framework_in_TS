import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void) : void;
  trigger(eventName: string): void;
}

interface HasId {
  id ?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    //Return a reference to the 'on' method available on an instance of Events class
    return this.events.on;
  }

  //Important: Accessor method can also be called as 
  // on = this.events.on;

  get trigger() {
    // Returns a reference to the 'trigger' method available on an instance of Events class
    return this.events.trigger;
  }

  //Important: Accessor method can also be called as 
  // trigger = this.events.trigger;

  get get() {
    // Returns a reference to the 'get' method available on an instance of attributes class
    return this.attributes.get;
  }

  //Important: Accessor method can also be called as 
  // get = this.events.get;

  set(update: T) : void {
    this.attributes.set(update)
    //When the properties of a user instance are updated or initialized, a change event will also be triggered
    this.events.trigger('change')
  }

  fetch() : void {
    const id = this.attributes.get('id')

    //if id is not a number then the user does not exist on the backend
    if(typeof id!== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse) : void => {
      //In this case, set method from the User class is invoked since we want to change event to trigger as well
      this.set(response.data);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse) : void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      })
  }
}