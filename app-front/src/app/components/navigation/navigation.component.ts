import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../modules/shop/services/auth.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    public isMenuCollapsed = true;

    constructor(public authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.checkToken().subscribe(
            res => {
                this.authService.setAuth(res)
            }
        )
    }

    logout(){
        this.authService.logOut();
    }
}
