import {User} from '../models/User';

export class UserForm {
  
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    })
  }

  eventsMap() : {[key: string] : () => void} {
    return {
      // We want to run the onButtonClick function whenever the button is clicked
      'click:.set-age': this.onSetAgeClick,
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }
 
  template():  string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input />
        <button>Click Me</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment) {
    //Stores the object returned by calling eventsMap method
    const eventsMap = this.eventsMap()

    //Iterates through each key in the eventsMap object
    for(let eventKey in eventsMap) {
      //Destructure to obtain the event name
      const [eventName, selector] = eventKey.split(':');
      //select each element which matches the specific selector
      fragment.querySelectorAll(selector).forEach(element => {
        //Add the event to the element
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render(): void {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content);
  }
}