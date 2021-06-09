import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
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
            this.loading = false;
        })
    }

    // removeProductFromCart(product: Product) {
    //     this.api.removeProduct(product, this.cartProducts, this.products);
    //     this.cartProducts = this.requestService.getCartProducts;
    // }

    removeProductFromCart(i) {
        const options = {
            'id_user': this.cartProducts[i].id_user,
            'id_product': this.cartProducts[i].id_product,
            'id_options': this.cartProducts[i].id_options,
            'product_count': -1
        }
        this.cartProducts[i].product_count--;
        if (this.cartProducts[i].product_count === 0) {
            this.cartProducts = this.cartProducts.filter((item) => item.id_product !== this.cartProducts[i].id_product);
        }
        this.requestService.setProductToCart(options).subscribe(
            (res) =>{},
            (error) =>{console.log('error', error)}
        )
    }

    addProductToCart(i) {
        const options = {
            'id_user': this.cartProducts[i].id_user,
            'id_product': this.cartProducts[i].id_product,
            'id_options': this.cartProducts[i].id_options,
            'product_count': 1,
            'product_sum': +(this.cartProducts[i].product_price * this.cartProducts[i].product_count).toFixed(2),
        }
        this.cartProducts[i].product_count++;
        this.requestService.setProductToCart(options).subscribe(
            (res) =>{},
            (error) =>{console.log('error', error)}
        )
    }

    get totalPrice() {
        return this.cartProducts.reduce((sum, good) => sum + good.product_price * good.product_count, 0).toFixed(2);
    }
}
