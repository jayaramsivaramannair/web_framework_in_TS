import axios, {AxiosResponse, AxiosPromise} from 'axios';


//HasId is an object which will have a property of 'id'
interface HasId {
  id?: number;
}


//T extends HasId suggests that any object which Class Sync is equipped to handle will have an id property
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    //Pulls off the id property off data
    const {id} = data;
    //If the user already exists then simply update the user by making a put request
    if(id) {
      return axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}