import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    users: any[] = [];
    usersObj: any = {};
    user: any = {};
    usersUrl = 'https://jsonplaceholder.typicode.com/users';
    forTest = 0;

    constructor(private http: HttpClient) {

    }

    loadUsers() {
        return new Observable(observer => {

            if (!this.users.length) {
                this.http.get(this.usersUrl).subscribe(users => {
                    this.users = <any>users;
                    this.users.forEach(element => {
                        this.usersObj[element.id] = element;
                    });

                    observer.next(users);
                    observer.complete();
                });
            } else {
                observer.next(this.users);
                observer.complete();
            }

        });
        //return this.http.get(this.usersUrl);
    }

    loadUser(id: string) {
        return new Observable(observer => {
            this.http.get(`${this.usersUrl}/${id}`).subscribe(user => {
                this.user = user;

                observer.next(user);
                observer.complete();
            });
        })
    }
}
