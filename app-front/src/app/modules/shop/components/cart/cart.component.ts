import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Product} from '../../services/product';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartProducts: Product[] = this.requestService.getCartProducts;
    products: Product[] = [];

    constructor(private requestService: RequestService, private api: ApiService) {
    }

    ngOnInit(): void {
    }

    removeProductFromCart(product: Product) {
        this.api.removeProduct(product, this.cartProducts, this.products);
        this.cartProducts = this.requestService.getCartProducts;
    }

    addProductToCart(product: Product) {
        this.api.addProduct(product, this.cartProducts, this.products);
    }

    get totalPrice() {
        return this.cartProducts.reduce((sum, good) => sum + good.product_price * good.count, 0).toFixed(2);
    }
}
