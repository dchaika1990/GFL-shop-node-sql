import { UsersService } from './shared/users.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private usersService: UsersService) {}
  transform(value: any, ...args: any[]): unknown {
   /*  
    if (typeof this.usersService.users[value] !== undefined) {
      return 
    }
    return value.split(' ')[0]; */

    let prop = args[0];
    let user = this.usersService.users[value];
    console.log(value, prop, user);

    return user[prop];
    //return null;
  }

}
