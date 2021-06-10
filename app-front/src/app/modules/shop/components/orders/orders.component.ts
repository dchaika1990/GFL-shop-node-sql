import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {Order} from "../../services/order";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {

    orders: Order[] = [];
    loading = true;

    constructor(private requestService: RequestService) {
    }

    ngOnInit(): void {
        this.requestService.getOrders().subscribe(
            res => {
                this.orders = (res as Order[])
                this.loading = false;
            },
            error => {
                console.log(error)
            }
        )
    }

}
