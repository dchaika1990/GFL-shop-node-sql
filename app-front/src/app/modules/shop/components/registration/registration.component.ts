import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
        private requestService: RequestService,
        private authService: AuthService,
        private flashMessage: FlashMessagesService,
    ) {
        this.registerForm = new FormGroup({
            user_login: new FormControl('', [Validators.required, Validators.minLength(2)]),
            user_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            user_email: new FormControl('', [Validators.required, Validators.email]),
            user_phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
            user_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
    }

    ngOnInit(): void {
    }

    submitAction(event: any) {
        event.preventDefault();
        this.authService.sendRegisterRequest(this.registerForm.value).subscribe(
            (res) => {
                this.authService.setCookie('token', res, {});
                this.authService.setAuth(true);
                this.authService.router.navigate([''])
            },
            (err) => {
                this.flashMessage.show(err.error.message, {
                    cssClass: 'alert-danger',
                    timeout: 4000
                });
            }
        )
    }

}
