import {Component, OnInit} from '@angular/core';
import {Order} from "../../interfaces/order";
import {RequestService} from "../../services/request.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-order-info',
    templateUrl: './order-info.component.html',
    styleUrls: ['./order-info.component.sass']
})
export class OrderInfoComponent implements OnInit {
    order: {} = {};
    loading = true;
    id: string = '';
    userName: string = '';

    constructor(private requestService: RequestService, private activeRoute: ActivatedRoute, private authService:AuthService) {
    }

    ngOnInit(): void {
        this.activeRoute.params.subscribe(params => {
            this.id = params.id;
        });
        this.requestService.getOrder(this.id).subscribe(
            res => {
                console.log(res)
                this.order = (res as Order)
                this.loading = false;
                this.userName = this.authService.userInfo[1]
            },
            error => {
                console.log(error)
            }
        )
    }

}
