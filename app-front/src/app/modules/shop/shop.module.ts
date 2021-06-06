import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './components/shop/shop.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThanksComponent} from './components/thanks/thanks.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {RequestService} from './services/request.service';
import {ReactiveFormsModule} from '@angular/forms';
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';

const routes: Routes = [
    {
        path: '', children: [
            {path: '', component: ShopComponent},
            {path: 'cart', component: CartComponent},
            {path: 'checkout', component: CheckoutComponent},
            {path: 'thanks', component: ThanksComponent},
        ]
    }
];

@NgModule({
    declarations: [
        ShopComponent,
        CartComponent,
        CheckoutComponent,
        ThanksComponent,
        FilterCategoryComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        RequestService
    ]
})
export class ShopModule {}
