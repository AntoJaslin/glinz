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
export class WebsiteService {

    BASE_URL: string = environment.baseUrl + "api/website/";

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    getAllCategories() {
        return this.httpClient.get(this.BASE_URL + 'getCategories');
    }

    getProducts(product: any, request: any) {
        return this.httpClient.get(this.BASE_URL + 'products/' + product + request);
    }

    getProductDetails(product: any) {
        return this.httpClient.get(this.BASE_URL + 'productDetails/' + product);
    }

    createOrder(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'create-order', payload);
    }
    
}