import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './components/shop/shop.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThanksComponent} from './components/thanks/thanks.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RequestService} from './services/request.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterCategoryComponent} from './components/filter-category/filter-category.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ProductComponent} from './components/product/product.component';
import {OrdersComponent} from './components/orders/orders.component';
import {OrderInfoComponent} from './components/order-info/order-info.component';


const routes: Routes = [
    {
        path: '', children: [
            {path: '', component: ShopComponent},
            {path: 'product/:id', component: ProductComponent},
            {path: 'register', component: RegistrationComponent},
            {path: 'login', component: LoginComponent},
            {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
            {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService]},
            {path: 'order',
                children: [
                    {path: '', component: OrdersComponent},
                    {path: ':id', component: OrderInfoComponent},
                ],
                canActivate: [AuthGuardService]
            }
        ]
    }
];

@NgModule({
    declarations: [
        ShopComponent,
        CartComponent,
        CheckoutComponent,
        ThanksComponent,
        FilterCategoryComponent,
        LoginComponent,
        RegistrationComponent,
        ProductComponent,
        OrdersComponent,
        OrderInfoComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        RequestService,
        AuthService,
        AuthGuardService
    ]
})
export class ShopModule {
}
