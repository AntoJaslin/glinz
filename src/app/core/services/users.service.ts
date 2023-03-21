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
export class UsersService {

    BASE_URL: string = environment.baseUrl + "api/";

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    getAllUsers() {
        return this.httpClient.get(this.BASE_URL + 'user/getAll');
    }

    createUser(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'user/create', payload);
    }

    editUser(id:any, payload: any) {
        return this.httpClient.patch(this.BASE_URL + 'user/update/'+id, payload);
    }

    getUser(id:any) {
        return this.httpClient.get(this.BASE_URL + 'user/getOne/'+id);
    }

    deleteUser(id:any) {
        return this.httpClient.delete(this.BASE_URL + 'user/delete/'+id)
    }
}