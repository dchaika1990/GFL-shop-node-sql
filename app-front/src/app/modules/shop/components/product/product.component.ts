import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductSingleInfo, ProductSingleOptions} from "../../services/productSingle";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
    productInfo: {} = {};
    productOptions: {} = {};
    loading = true;
    id: string = '';
    proxy: String = this.requestService.proxyServ;
    id_type: String = '';
    id_color: String = '';
    id_size: String = '';

    constructor(private requestService: RequestService, private router: Router, private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activeRoute.params.subscribe(params => {
            this.id = params.id;
        });
        this.requestService.loadSingleProduct(this.id, this.id_type, this.id_color).subscribe((product) => {
            this.productInfo = product['info'] as ProductSingleInfo;
            this.productOptions = product['options'] as ProductSingleOptions;
            this.loading = false;
        });
    }

    checkOption(event) {
        let elem = event.target;
        if (elem.getAttribute('data-id_type')){
            this.id_color = '';
            this.id_type = event.target.getAttribute('data-id_type')
            this.requestService.loadSingleProduct(this.id, this.id_type, this.id_color).subscribe((product) => {
                this.productOptions['id_size'] = product['options']['id_size'];
                this.productOptions['size_name'] = product['options']['size_name'];
                this.productOptions['id_color'] = product['options']['id_color'];
                this.productOptions['color_name'] = product['options']['color_name'];
                this.loading = false;
            });
        }
        if (elem.getAttribute('data-id_color')){
            this.id_size = '';
            this.id_color = event.target.getAttribute('data-id_color')
            this.requestService.loadSingleProduct(this.id, this.id_type, this.id_color).subscribe((product) => {
                this.productOptions['id_size'] = product['options']['id_size'];
                this.productOptions['size_name'] = product['options']['size_name'];
                this.loading = false;
            });
        }
        if (elem.getAttribute('data-id_size')){
            this.id_size = event.target.getAttribute('data-id_size')
            this.requestService.loadSingleProduct(this.id, this.id_type, this.id_color, this.id_size).subscribe((product) => {
                console.log(product['options'])
                this.loading = false;
            });
        }
    }
}
