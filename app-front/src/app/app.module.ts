import {ShopModule} from './modules/shop/shop.module';
import {UsersService} from './shared/users.service';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {UserPipe} from './user.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavigationComponent} from './components/navigation/navigation.component';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundPageComponent,
        UserPipe,
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
        ShopModule,
        AppRoutingModule,
    ],
    providers: [
        UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
