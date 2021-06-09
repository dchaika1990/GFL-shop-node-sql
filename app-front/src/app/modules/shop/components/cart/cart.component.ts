import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Product} from '../../services/product';
import {ApiService} from '../../services/api.service';
import {AuthService} from "../../services/auth.service";
import {CartItem} from "../../services/cartItem";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartProducts: CartItem[] = [];
    loading = true;
    constructor(private requestService: RequestService) {
    }

    ngOnInit(): void {
        this.requestService.loadCartProducts().subscribe(items => {
            this.cartProducts = (items as CartItem[]);
            console.log(this.cartProducts)
            this.loading = false;
        })
    }

    // removeProductFromCart(product: Product) {
    //     this.api.removeProduct(product, this.cartProducts, this.products);
    //     this.cartProducts = this.requestService.getCartProducts;
    // }
    //
    // addProductToCart(product: Product) {
    //     this.api.addProduct(product, this.cartProducts, this.products);
    // }
    //
    get totalPrice() {
        return this.cartProducts.reduce((sum, good) => sum + good.product_price * good.product_count, 0).toFixed(2);
    }
}
