import {Component, OnInit} from '@angular/core';
import {Product} from '../../interfaces/product';
import {RequestService} from '../../services/request.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {
    products: Product[] = [];
    loading = true;
    proxy: String = this.requestService.proxyServ;
    pageNumValue = 1;
    pageLimit = 0;

    constructor(
        private requestService: RequestService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activeRoute.params.subscribe(params => {
            this.pageNum = params.id || 1;
            this.requestService.loadProducts(this.pageNum).subscribe((products) => {
                this.products = (products as Product[]);
                this.pageLimit = this.requestService.limit;
                this.loading = false;
                this.requestService.categoryId = null;
            });
        })
    }

    renderProductsByCategory(id) {
        if (id) {
            this.requestService.categoryId = id;
            this.router.navigate(['categories', id]);
        }
    }

    get pageNum() {
        return this.pageNumValue;
    }

    set pageNum(value) {
        this.pageNumValue = value;
        this.router.navigate(['page', value]);
    }

    get productsCount() {
        return this.requestService.productsCount;
    }
}
