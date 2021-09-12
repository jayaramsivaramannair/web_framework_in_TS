//Interface is used to define types
interface UserProps {
  name: string;
  age: number;
}

export class User {
  //data property is made private so that it cannot be accessed outside the class
  constructor(private data: UserProps) {}

  get(propName: string): (string | number) {
    return this.data[propName]
  }
}