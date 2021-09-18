import {Model} from '../models/Model';

export abstract class View<T extends Model<K>, K> {

  regions: {[key: string]: Element} = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): {[key: string]: string} {
    return {}
  }

  eventsMap(): {[key: string]: () => void} {
    return {};
  };


  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    })
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

  mapRegions(fragment: DocumentFragment) : void {
    //regionsMap is an object
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if(element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {
    
  }

  render(): void {
    this.parent.innerHTML = ''

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content)
    this.mapRegions(templateElement.content)

    this.onRender();

    this.parent.append(templateElement.content);
  }
}