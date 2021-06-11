import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../interfaces/product';
import {Category} from "../interfaces/category";
import {CartItem} from "../interfaces/cartItem";
import config from '../../../../config.dev.js'
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    apiUrl = this.proxyServ + 'api/product';
    apiUrlCategories = this.proxyServ + 'api/category';
    apiUrlProduct = this.proxyServ + 'api/product';
    apiUrlCartAdd = this.proxyServ + 'api/cart/add';
    apiUrlCartGet = this.proxyServ + 'api/cart/get';
    apiUrlInfoForCheckout = this.proxyServ + 'api/order/checkout';
    apiUrlAddOrder = this.proxyServ + 'api/order/add';
    apiUrlGetOrders = this.proxyServ + 'api/order';
    products: Product[] = [];
    categories: Category[] = [];
    cartProducts: CartItem[] = [];
    product: {} = {}

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    get proxyServ(){
        return config.proxy
    }

    loadProducts() {
        const request = this.http.get(this.apiUrl, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.products = (response.body as Product[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    loadSingleProduct(id, type: String = '', color: String = '', size: String = '') {
        let query: string = '?';
        if (type) query += `type=${type}&`;
        if (color) query += `color=${color}&`;
        if (size) query += `size=${size}`;
        const request = this.http.get(this.apiUrlProduct + '/' + id + query , {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.products = (response.body as Product[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    loadProductsByCategories(id: String) {
        const request = this.http.get(this.apiUrl + '?categoryId=' + id, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.products = (response.body as Product[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    loadCategories() {
        const request = this.http.get(this.apiUrlCategories, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.categories = (response.body as Category[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    setProductToCart(options) {
        return this.http.post(this.apiUrlCartAdd, options)
    }

    loadCartProducts(){
        const request = this.http.get(this.apiUrlCartGet + '?token=' + this.authService.userToken, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.cartProducts = (response.body as CartItem[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    loadMethods(){
        const request = this.http.get(this.apiUrlInfoForCheckout  + '?token=' + this.authService.userToken, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    addOrder(options){
        return this.http.post(this.apiUrlAddOrder, options)
    }

    getOrders(){
        const request = this.http.get(this.apiUrlGetOrders + '?token=' + this.authService.userToken, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    getOrder(id){
        const request = this.http.get(this.apiUrlGetOrders + '/' + id, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    setCartProducts(item: any) {
        localStorage.setItem('cartProducts', item);
    }
}
