import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductSingleInfo, ProductSingleOptions} from "../../services/productSingle";
import {AuthService} from "../../services/auth.service";

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
    product_count: number = 0;


    constructor(private requestService: RequestService, private authService: AuthService,private router: Router, private activeRoute: ActivatedRoute) {
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
                this.productOptions['color_code'] = product['options']['color_code'];
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
                this.productOptions['id_options'] = product['options']['id_options'];
                this.loading = false;
            });
        }
    }

    addToCart(){
        if (this.authService.isAuthenticated()) {
            const options = {
                'id_user': +this.authService.userInfo[0],
                'id_product': +this.id,
                'id_options': +this.productOptions['id_options'],
                'product_count': +this.product_count,
                'product_sum': +(+this.product_count * +this.productInfo['product_price']).toFixed(2)
            }
            this.requestService.setProductToCart(options).subscribe(
                (res) =>{
                    this.router.navigate(['cart'])
                },
                (error) =>{console.log('error', error)}
            )
        } else {
            this.router.navigate(['login'])
        }
    }
}
