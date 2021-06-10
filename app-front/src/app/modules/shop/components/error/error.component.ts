import {Component, OnInit} from '@angular/core';
import {ErrorService} from "../../services/error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {

    errorMessage: string = this.errorService.errorMessage;

    constructor(
        public errorService: ErrorService
    ) {
    }

    ngOnInit(): void {
        console.log(this.errorMessage)
    }

}
