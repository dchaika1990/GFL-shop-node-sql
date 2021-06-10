import {Injectable} from '@angular/core';
import {Router, CanActivate} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate(): boolean {
        this.auth.checkToken().subscribe(
            (res) => {
                this.auth.setAuth(res);
                console.log('AuthGuardService', res)
                if (!res) {
                    this.router.navigate(['login']);
                    return false;
                }
            },
            (err) => console.log(err)
        )
        return true;
    }
}
