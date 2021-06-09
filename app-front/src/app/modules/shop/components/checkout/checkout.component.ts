import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {Method} from "../../services/method";
import {PriceOption} from "../../services/price-option";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

    checkoutForm: FormGroup;
    payment_method: Method[] = []
    delivery_method: Method[] = []
    price_option: PriceOption[] = []

    constructor(private requestService: RequestService) {
        this.checkoutForm = new FormGroup({
            country: new FormControl('', [Validators.required, Validators.minLength(2)]),
            city: new FormControl('', [Validators.required, Validators.minLength(2)]),
            state: new FormControl('', [Validators.required, Validators.minLength(2)]),
            deliveryAddress: new FormControl('', [Validators.required, Validators.minLength(2)]),
            postcode: new FormControl('', [Validators.required, Validators.minLength(2)]),
            payment_method: new FormControl('', [Validators.required, Validators.minLength(2)]),
            delivery_method: new FormControl('', [Validators.required, Validators.minLength(2)]),
            comments: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.requestService.loadMethods().subscribe((res) => {
            this.payment_method = (res['payment_method'] as Method[])
            this.delivery_method = (res['delivery_method'] as Method[])
            this.price_option = (res['price_options'] as PriceOption[])
        })
    }

    submitAction(event: any) {
        event.preventDefault();
        console.log('LOG ===', this.checkoutForm.value);
        this.requestService.setCartProducts(JSON.stringify([]));
    }

    get totalPrice() {
        return +this.price_option.reduce((sum, good) => sum + good.sum * good.count, 0).toFixed(2);
    }
}
