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
    productsCount: number = 0;
    pageNumber: number = 1;
    limit = 8;
    _categoryId: string = null;

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    // Proxy url
    get proxyServ() {
        return config.proxy
    }

    // Load all products
    loadProducts(pageNumber: number = 1) {
        this.pageNumber = pageNumber;
        let start = (pageNumber - 1) * this.limit;
        let url = `${this.apiUrl}/?_limit=${this.limit}&_start=${start}`;
        const request = this.http.get(url, {observe: 'response'});

        return new Observable(observer => {
            request.subscribe(response => {
                let totalCount = response.body['total-count'];
                this.productsCount = Number(totalCount);
                this.products = (response.body['products'] as Product[]);
                observer.next(response.body['products']);
                observer.complete();
            });
        });
    }

    // Load all products by category
    loadProductsByCategories(id: String, pageNumber: number = 1) {
        let url = `${this.apiUrl}/?categoryId=${id}`;
        const request = this.http.get(url, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.products = (response.body['products'] as Product[]);
                let totalCount = response.body['total-count'];
                this.productsCount = Number(totalCount);
                observer.next(response.body['products']);
                observer.complete();
            });
        });
    }

    // Load single product
    loadSingleProduct(id, type: String = '', color: String = '', size: String = '') {
        let query: string = '?';
        if (type) query += `type=${type}&`;
        if (color) query += `color=${color}&`;
        if (size) query += `size=${size}`;
        const request = this.http.get(this.apiUrlProduct + '/' + id + query, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.products = (response.body as Product[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    // Load all categories
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

    // Send products to cart
    setProductToCart(options) {
        return this.http.post(this.apiUrlCartAdd, options)
    }

    // Loaf products from table cart
    loadCartProducts() {
        const request = this.http.get(this.apiUrlCartGet + '?token=' + this.authService.userToken, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                this.cartProducts = (response.body as CartItem[]);
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    // Load payment and delivery methods
    loadMethods() {
        const request = this.http.get(this.apiUrlInfoForCheckout + '?token=' + this.authService.userToken, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    // Send order
    addOrder(options) {
        return this.http.post(this.apiUrlAddOrder, options)
    }

    // Get orders from order table
    getOrders() {
        const request = this.http.get(this.apiUrlGetOrders + '?token=' + this.authService.userToken, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    // Get single order from order table
    getOrder(id) {
        const request = this.http.get(this.apiUrlGetOrders + '/' + id, {observe: 'response'});
        return new Observable(observer => {
            request.subscribe(response => {
                observer.next(response.body);
                observer.complete();
            });
        });
    }

    set categoryId(id: string) {
        this._categoryId = id;
    }

    get categoryId() {
        return this._categoryId;
    }
}
