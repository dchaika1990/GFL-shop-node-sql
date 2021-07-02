import {Component, OnInit} from '@angular/core';
import {Product} from "../../interfaces/product";
import {RequestService} from "../../services/request.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-products-category',
    templateUrl: './products-category.component.html',
    styleUrls: ['./products-category.component.sass']
})
export class ProductsCategoryComponent implements OnInit {

    products: Product[] = [];
    loading = true;
    proxy: String = this.requestService.proxyServ;
    id: string = this.requestService.categoryId;

    constructor(
        private requestService: RequestService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.renderProductsByCategory(this.id)
    }

    renderProductsByCategory(id: string) {
        if (id) {
            this.requestService.loadProductsByCategories(id).subscribe((products) => {
                this.router.navigate(['categories', id]);
                this.products = (products as Product[]);
                this.loading = false;
            });
        } else {
            this.requestService.categoryId = null;
            this.router.navigate(['page', 1]);
        }
    }

}
