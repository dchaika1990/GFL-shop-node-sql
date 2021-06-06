import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../services/product';
import {RequestService} from '../../services/request.service';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    products: Product[] = [];
    loading = true;
    cartProducts: Product[] = this.requestService.getCartProducts;

    constructor(private requestService: RequestService, private apiService: ApiService) {
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

    addToCart(product: Product) {
        this.apiService.addProduct(product, this.cartProducts, this.products);
    }
}
