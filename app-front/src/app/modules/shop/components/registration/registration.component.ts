import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private requestService: RequestService, private authService: AuthService) {
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
        this.authService.sendRegisterRequest(this.registerForm.value)
        // this.requestService.setCartProducts(JSON.stringify([]));
    }

}
