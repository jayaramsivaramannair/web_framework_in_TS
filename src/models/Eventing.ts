
//type alias - a callback function which takes no arguments and returns void
type Callback = () => void;

export class Eventing {
  //events property will be an object with a string as its key and its associated value to be an array of callback functions
  events: {[key: string]: Callback[]} = {};

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
}