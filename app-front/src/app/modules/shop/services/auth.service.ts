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

    constructor(private http: HttpClient, public router: Router) {
    }

    // Get User info
    get userInfo() {
        return this.getCookie('token') ? window.atob(this.getCookie('token')).split('.') : ''
    }

    // Get User Token
    get userToken() {
        return this.getCookie('token') ? this.getCookie('token') : ''
    }

    // Set boolean authorization
    setAuth(data){
        return this.isAuth = data
    }

    // Send token to backend to check
    checkToken() {
        return this.http.post(this.checkUrl, {'user_token': this.userToken})
    }

    // Send values to backend to login
    sendLoginRequest(formData) {
        return this.http.post(this.loginUrl, formData)
    }

    // Send values to backend to registration
    sendRegisterRequest(formData) {
        return this.http.post(this.registerUrl, formData)
    }

    // Clean token
    logOut(){
        this.deleteCookie('token');
        this.setAuth(false);
        this.router.navigate([''])
    }

    // Proxy url
    get proxyServ() {
        return config.proxy
    }

    // Get is user is authenticated
    public isAuthenticated(): Boolean {
        return this.isAuth
    }

    // Function to get cookie
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    // Function to set cookie
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

    // Function to delete cookie
    deleteCookie(name) {
        this.setCookie(name, '', {});
    }

}
