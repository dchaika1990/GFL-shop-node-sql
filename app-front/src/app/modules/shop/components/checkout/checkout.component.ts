import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../services/request.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private requestService: RequestService) {
        this.loginForm = new FormGroup({
            firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
            lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
            phone: new FormControl('', [Validators.required, Validators.minLength(2)]),
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    ngOnInit(): void {
    }

    submitAction(event: any) {
        event.preventDefault();
        console.log('LOG ===', this.loginForm.value);
        this.requestService.setCartProducts(JSON.stringify([]));
    }

}
