export class UserForm {
  
  constructor(public parent: Element) {}

  eventsMap() : {[key: string] : () => void} {
    return {
      // We want to run the onButtonClick function whenever the button is clicked
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onHeaderHover
    }
  }

  onHeaderHover(): void {
    console.log('H1 was hovered over');
  }

  onButtonClick(): void {
    console.log('Hi there');
  }
  
  template():  string {
    return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Click Me</button>
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
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content);
  }
}