import {Injectable} from '@angular/core';
import {Router, CanActivate} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {FlashMessagesService} from "angular2-flash-messages";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    /*
        service for transferring to the router module, whether the user is logged in
     */

    constructor(
        public auth: AuthService,
        public router: Router,
        private flashMessage: FlashMessagesService,
    ) {
    }

    // @ts-ignore
    canActivate(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.auth.checkToken().subscribe(
                res => {
                    this.auth.setAuth(res);
                    if (!res) {
                        this.router.navigate(['login']);
                        observer.next(false);
                    } else {
                        observer.next(true);
                    }

                    observer.complete();
                },
                error => {
                    this.flashMessage.show(error.error.message, {
                        cssClass: 'alert-danger',
                        timeout: 4000
                    });
                }
            )
        })
    }
}
