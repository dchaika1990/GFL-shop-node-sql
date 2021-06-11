import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {CartItem} from "../../interfaces/cartItem";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
    cartProducts: CartItem[] = [];
    options: {} = {};
    loading = true;

    constructor(
        private requestService: RequestService,
        private authService: AuthService,
        private flashMessage: FlashMessagesService,
    ) {
    }

    ngOnInit(): void {
        this.requestService.loadCartProducts().subscribe(
            items => {
                this.cartProducts = (items as CartItem[]);
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

    removeProductFromCart(i) {
        this.cartProducts[i].product_count--;
        this.options = {
            'id_user': this.cartProducts[i].id_user,
            'id_product': this.cartProducts[i].id_product,
            'id_options': this.cartProducts[i].id_options,
            'product_count': -1,
            'product_sum': +(this.cartProducts[i].product_price * this.cartProducts[i].product_count).toFixed(2),
        }
        if (this.cartProducts[i].product_count === 0) {
            this.cartProducts = this.cartProducts.filter((item) => item.id_product !== this.cartProducts[i].id_product);
            this.flashMessage.show('Remove product', {
                cssClass: 'alert-info',
                timeout: 4000
            });
        }
        this.requestService.setProductToCart(this.options).subscribe(
            (res) => {
                this.flashMessage.show('You have removed a product', {
                    cssClass: 'alert-success',
                    timeout: 4000
                });
            },
            (error) => {
                this.flashMessage.show(error.error.message, {
                    cssClass: 'alert-danger',
                    timeout: 4000
                });
            }
        )
    }

    addProductToCart(i) {
        this.cartProducts[i].product_count++;
        this.options = {
            'id_user': this.cartProducts[i].id_user,
            'id_product': this.cartProducts[i].id_product,
            'id_options': this.cartProducts[i].id_options,
            'product_count': 1,
            'product_sum': (this.cartProducts[i].product_price * this.cartProducts[i].product_count).toFixed(2),
        }
        this.requestService.setProductToCart(this.options).subscribe(
            (res) => {
                this.flashMessage.show('You have added a product', {
                    cssClass: 'alert-success',
                    timeout: 4000
                });
            },
            (error) => {
                this.flashMessage.show(error.error.message, {
                    cssClass: 'alert-danger',
                    timeout: 4000
                });
            }
        )
    }

    get totalPrice() {
        return this.cartProducts.reduce((sum, good) => sum + good.product_price * good.product_count, 0).toFixed(2);
    }
}
