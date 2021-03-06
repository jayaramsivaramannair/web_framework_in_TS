import {Model} from './Model'
import {Attributes} from './Attributes'
import {ApiSync} from './ApiSync'
import {Eventing} from './Eventing'
import {Collection} from './Collection'

//Interface is used to define types
export interface UserProps {
  //name and age property in this interface are made optional with use of a '?'
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps) : User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    )
  }

  static buildUserCollection() : Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (json: UserProps) => User.buildUser(json)
      );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}