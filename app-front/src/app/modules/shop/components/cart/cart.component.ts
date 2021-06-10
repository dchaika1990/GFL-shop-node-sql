import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {CartItem} from "../../services/cartItem";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
    cartProducts: CartItem[] = [];
    loading = true;
    constructor(private requestService: RequestService, private authService: AuthService) {
    }

    ngOnInit(): void {
        if (this.authService.userToken) {
            this.requestService.loadCartProducts().subscribe(items => {
                this.cartProducts = (items as CartItem[]);
                this.loading = false;
            })
        }
    }

    removeProductFromCart(i) {
        this.cartProducts[i].product_count--;
        const options = {
            'id_user': this.cartProducts[i].id_user,
            'id_product': this.cartProducts[i].id_product,
            'id_options': this.cartProducts[i].id_options,
            'product_count': -1,
            'product_sum': +(this.cartProducts[i].product_price * this.cartProducts[i].product_count).toFixed(2),
        }
        if (this.cartProducts[i].product_count === 0) {
            this.cartProducts = this.cartProducts.filter((item) => item.id_product !== this.cartProducts[i].id_product);
        }
        this.requestService.setProductToCart(options).subscribe(
            (res) =>{},
            (error) =>{console.log('error', error)}
        )
    }

    addProductToCart(i) {
        this.cartProducts[i].product_count++;
        const options = {
            'id_user': this.cartProducts[i].id_user,
            'id_product': this.cartProducts[i].id_product,
            'id_options': this.cartProducts[i].id_options,
            'product_count': 1,
            'product_sum': (this.cartProducts[i].product_price * this.cartProducts[i].product_count ).toFixed(2),
        }
        this.requestService.setProductToCart(options).subscribe(
            (res) =>{},
            (error) =>{console.log('error', error)}
        )
    }

    get totalPrice() {
        return this.cartProducts.reduce((sum, good) => sum + good.product_price * good.product_count, 0).toFixed(2);
    }
}
