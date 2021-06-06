import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';
import {Category} from "./category";

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    apiUrl = 'http://localhost:3010/api/product';
    apiUrlCategories = 'http://localhost:3010/api/category';
    products: Product[] = [];
    categories: Category[] = [];

    constructor(private http: HttpClient) {
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

    get getCartProducts() {
        return JSON.parse(localStorage.getItem('cartProducts') as string) || [];
    }

    setCartProducts(item: any) {
        localStorage.setItem('cartProducts', item);
    }
}