import {User} from './models/User';

const user = new User({name: 'new record', age: 45});

console.log(user.get('name'));


user.on('change', () => {
  console.log('User was changed')
})


user.set({name: 'New name'});


