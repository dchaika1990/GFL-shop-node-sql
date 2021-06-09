import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';
import {Category} from "./category";
import config from '../../../../config.dev.js'

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    apiUrl = this.proxyServ + 'api/product';
    apiUrlCategories = this.proxyServ + 'api/category';
    apiUrlProduct = this.proxyServ + 'api/product';
    apiUrlCart = this.proxyServ + 'api/product/cart';
    products: Product[] = [];
    categories: Category[] = [];
    product: {} = {}

    constructor(private http: HttpClient) {
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
        return this.http.post(this.apiUrlCart, options)
    }

    get getCartProducts() {
        return JSON.parse(localStorage.getItem('cartProducts') as string) || [];
    }

    setCartProducts(item: any) {
        localStorage.setItem('cartProducts', item);
    }
}
