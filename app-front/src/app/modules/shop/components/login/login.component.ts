import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private requestService: RequestService, private authService: AuthService) {
        this.loginForm = new FormGroup({
            user_login: new FormControl('', [Validators.required, Validators.minLength(2)]),
            user_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
    }

    ngOnInit(): void {
    }

    submitAction(event: any) {
        event.preventDefault();
        this.authService.sendLoginRequest(this.loginForm.value)
        // this.requestService.setCartProducts(JSON.stringify([]));
    }

}
