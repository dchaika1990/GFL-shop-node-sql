import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: any = '';

    constructor(private requestService: RequestService, private authService: AuthService, public router: Router) {
        this.loginForm = new FormGroup({
            user_login: new FormControl('', [Validators.required, Validators.minLength(2)]),
            user_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
    }

    ngOnInit(): void {
        console.log(this.authService.isAuthenticated())
    }

    submitAction(event: any) {
        event.preventDefault();
        this.authService.sendLoginRequest(this.loginForm.value).subscribe(
            (res) => {
                this.authService.setCookie('token', res, {});
                this.authService.setAuth(true);
                this.router.navigate([''])
            },
            (err) => {
                console.log(err.error.message)
            }
        );
    }

}
