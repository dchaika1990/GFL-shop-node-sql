import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {Order} from "../../interfaces/order";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
    orders: Order[] = [];
    loading = true;

    constructor(
        private requestService: RequestService,
        private authService: AuthService,
        private flashMessage: FlashMessagesService,
    ) {
    }

    ngOnInit(): void {
        console.log('Order isAuthenticated ', this.authService.isAuthenticated())
        this.requestService.getOrders().subscribe(
            res => {
                this.orders = (res as Order[])
                this.loading = false;
            },
            error => {
                this.flashMessage.show(error.error.message, {
                    cssClass: 'alert-danger',
                    timeout: 4000
                });
            }
        )
    }
}
