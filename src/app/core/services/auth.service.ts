import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({}),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    BASE_URL: string = environment.baseUrl + "api/auth/";
    

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    loginAdminUser(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'admin/login', payload);
    }

    loginUser(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'login', payload);
    }

    signupUser(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'signup', payload);
    }

    isUserExist(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'user-exist', payload);
    }

    resetPassword(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'reset-password', payload);
    }
}