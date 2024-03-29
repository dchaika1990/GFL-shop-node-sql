import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {Method} from "../../interfaces/method";
import {PriceOption} from "../../interfaces/price-option";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

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

    constructor(
        private requestService: RequestService,
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService,
    ) {
        this.checkoutForm = new FormGroup({
            country: new FormControl('', [Validators.required, Validators.minLength(2)]),
            city: new FormControl('', [Validators.required, Validators.minLength(2)]),
            state: new FormControl('', [Validators.required, Validators.minLength(2)]),
            delivery_address: new FormControl('', [Validators.required, Validators.minLength(2)]),
            postcode: new FormControl('', [Validators.required, Validators.minLength(2)]),
            payment_method: new FormControl('', [Validators.required, Validators.minLength(2)]),
            delivery_method: new FormControl('', [Validators.required, Validators.minLength(2)]),
            order_comments: new FormControl(''),
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
        let info = {
            id_user: this.authService.userInfo[0],
            ...this.checkoutForm.value,
            order_full_price: this.totalPrice,
            date_of_order: new Date(),
        }
        this.requestService.addOrder(info).subscribe(
            res => {
                this.flashMessage.show('Created the order', {
                    cssClass: 'alert-success',
                    timeout: 4000
                });
                this.router.navigate(['order'])
            },
            error => {
                this.flashMessage.show(error.error.message, {
                    cssClass: 'alert-danger',
                    timeout: 4000
                });
            });

    }

    get totalPrice() {
        return +this.price_option.reduce((sum, good) => sum + good.sum, 0).toFixed(2);
    }
}
