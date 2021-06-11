import {Component, OnInit} from '@angular/core';
import {Order} from "../../interfaces/order";
import {RequestService} from "../../services/request.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {OrderProductInfo} from "../../interfaces/orderProductInfo";

@Component({
    selector: 'app-order-info',
    templateUrl: './order-info.component.html',
    styleUrls: ['./order-info.component.sass']
})
export class OrderInfoComponent implements OnInit {
    orderInfo: {} = {};
    orderProductsInfo: OrderProductInfo[] = [];
    loading = true;
    id: string = '';
    userName: string = '';

    constructor(
        private requestService: RequestService,
        private activeRoute: ActivatedRoute,
        private authService:AuthService,
        private flashMessage: FlashMessagesService,
    ) {
    }

    ngOnInit(): void {
        this.activeRoute.params.subscribe(params => {
            this.id = params.id;
        });
        this.requestService.getOrder(this.id).subscribe(
            res => {
                this.orderInfo = (res['orderInfo'] as Order)
                this.orderProductsInfo = (res['orderProductsInfo'] as OrderProductInfo[])
                this.loading = false;
                this.userName = this.authService.userInfo[1]
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
