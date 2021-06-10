import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    errorMessage: string = '';

    constructor() {
    }

    writeMessage(error) {
        this.errorMessage = error;
    }

    get error(){
        return this.errorMessage
    }
}
