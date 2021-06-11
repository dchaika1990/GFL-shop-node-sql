import {Injectable} from '@angular/core';
import {Router, CanActivate} from "@angular/router";
import {AuthService} from "./auth.service";
import {observable, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        public auth: AuthService,
        public router: Router
    ) {
    }

    // @ts-ignore
    canActivate(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.auth.checkToken().subscribe(
                (res) => {
                    this.auth.setAuth(res);
                    if (!res) {
                        // this.router.navigate(['login']);
                        observer.next(false);
                    } else {
                        observer.next(true);
                    }

                    observer.complete();
                },
                (err) => console.log(err)
            )
        })
    }
}
