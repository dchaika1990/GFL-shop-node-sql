import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private requestService: RequestService,
        private authService: AuthService,
        public router: Router,
        private flashMessage: FlashMessagesService,
    ) {
        this.loginForm = new FormGroup({
            user_login: new FormControl('', [Validators.required, Validators.minLength(2)]),
            user_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
    }

    ngOnInit(): void {}

    submitAction(event: any) {
        event.preventDefault();
        this.authService.sendLoginRequest(this.loginForm.value).subscribe(
            (res) => {
                this.authService.setCookie('token', res, {});
                this.authService.setAuth(true);
                this.flashMessage.show( 'You are now logged in', {
                    cssClass: 'alert-success',
                    timeOut: 4000
                } );
                this.router.navigate([''])
            },
            (err) => {
                this.flashMessage.show(err.error.message, {
                    cssClass: 'alert-danger',
                    timeout: 4000
                });
            }
        );
    }

}
