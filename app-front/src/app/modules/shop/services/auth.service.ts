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

    constructor(private http: HttpClient, public router: Router) {}

    get userInfo(){
        return this.getCookie('token') ? window.atob(this.getCookie('token')).split('.') : ''
    }

    sendLoginRequest(formData){
        this.http.post(this.loginUrl, formData).subscribe(
            (res) => {
                this.setCookie('token', res, {});
                this.router.navigate(['cart'])
            },
            (err) => console.log(err)
        )
    }

    sendRegisterRequest(formData){
        this.http.post(this.registerUrl, formData).subscribe(
            (res) => {
                this.setCookie('token', res, {});
                this.router.navigate(['cart'])
            },
            (err) => console.log(err)
        )
    }

    get proxyServ(){
        return config.proxy
    }

    public isAuthenticated(): Boolean{
        return !!this.getCookie('token')
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
}
