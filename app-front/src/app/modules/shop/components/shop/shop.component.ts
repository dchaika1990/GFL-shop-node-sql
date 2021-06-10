import {Component, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {RequestService} from '../../services/request.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {
    products: Product[] = [];
    loading = true;
    cartProducts: Product[] = [];
    proxy: String = this.requestService.proxyServ

    constructor(private requestService: RequestService) {
    }

    ngOnInit(): void {
        this.requestService.loadProducts().subscribe((products) => {
            this.products = (products as Product[]);
            this.loading = false;
        });
    }

    renderProductsByCategory(id: String){
        if (id) {
            this.requestService.loadProductsByCategories(id).subscribe((products) => {
                this.products = (products as Product[]);
                this.loading = false;
            });
        } else {
            this.requestService.loadProducts().subscribe((products) => {
                this.products = (products as Product[]);
                this.loading = false;
            });
        }
    }
}
