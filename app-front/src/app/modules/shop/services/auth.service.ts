import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import config from '../../../../config.dev.js'
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loginUrl = this.proxyServ + 'api/auth/login';
    registerUrl = this.proxyServ + 'api/auth/registration';
    checkUrl = this.proxyServ + 'api/auth/check';
    isAuth: any = false;
    errorMessage: any = '';

    constructor(private http: HttpClient, public router: Router) {
    }

    get userInfo() {
        return this.getCookie('token') ? window.atob(this.getCookie('token')).split('.') : ''
    }

    get userToken() {
        return this.getCookie('token') ? this.getCookie('token') : ''
    }

    get errorMsg() {
        return this.errorMessage
    }

    setError(err){
        this.errorMessage = err
    }

    checkToken() {
        this.http.post(this.checkUrl, {'user_token': this.userToken}).subscribe(
            (res) => {
                this.isAuth = res;
            },
            (err) => console.log(err)
        )
    }

    sendLoginRequest(formData) {
        this.http.post(this.loginUrl, formData).subscribe(
            (res) => {
                this.setCookie('token', res, {});
                this.isAuth = true;
                this.router.navigate(['cart'])
            },
            (err) => {
                console.log(err.error.message)
                return err.error.message;
            }
        );
    }

    sendRegisterRequest(formData) {
        this.http.post(this.registerUrl, formData).subscribe(
            (res) => {
                this.setCookie('token', res, {});
                this.isAuth = true;
                this.router.navigate(['cart'])
            },
            (err) => {
                this.errorMessage = err.error.message;
            }
        )
    }

    logOut(){
        this.deleteCookie('token');
        this.isAuth = false;
        this.router.navigate([''])
    }

    get proxyServ() {
        return config.proxy
    }

    public isAuthenticated(): Boolean {
        return this.isAuth
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    setCookie(name, value, props) {
        props = props || {}

        let exp = props.expires
        if (typeof exp == "number" && exp) {
            let d = new Date()
            d.setTime(d.getTime() + exp * 1000)
            exp = props.expires = d
        }

        if (exp && exp.toUTCString) {
            props.expires = exp.toUTCString()
        }

        value = encodeURIComponent(value)

        let updatedCookie = name + "=" + value

        for (let propName in props) {
            updatedCookie += "; " + propName
            let propValue = props[propName]
            if (propValue !== true) {
                updatedCookie += "=" + propValue
            }
        }
        document.cookie = updatedCookie
    }

    deleteCookie(name) {
        this.setCookie(name, '', {});
    }

}
